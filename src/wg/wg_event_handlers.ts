import { EventRecord } from "@polkadot/types/interfaces";
import { getSdk } from '../qntypes'
import {
    getApplicationWithdrawnEmbed,
    getAppliedOnOpeningEmbed,
    getLeaderSetEmbed,
    getLeaderUnsetEmbed,
    getBudgetSetEmbed,
    getOpeningAddedEmbed,
    getOpeningFilledEmbed,
    getStakeUpdatedEmbed,
    getWorkerExitedEmbed,
    getWorkerRewardAmountUpdatedEmbed,
    getWorkerTerminatedEmbed,
    getOpeningCancelledEmbed,
    getWorkerRewardedEmbed,
} from "./embeds";
import { wgEvents, channelNames, hydraLocation as queryNodeUrl } from "../../config";
import { DiscordChannels } from "../types";
import type { Option } from '@polkadot/types';

import { ApplicationId, ApplyOnOpeningParameters, OpeningId, WorkingGroup, RewardPaymentType } from "@joystream/types/augment/all/types";
import { WorkerId } from "@joystream/types/working-group";
import { Balance } from "@joystream/types/common";
import { GraphQLClient } from 'graphql-request';
import { delay } from "../util";
import { TextChannel } from "discord.js";

const queryNodeClient = getSdk(new GraphQLClient(queryNodeUrl));

export const processGroupEvents = (
    blockNumber: number,
    events: EventRecord[],
    channels: DiscordChannels
) =>
    events.forEach(
        async (value: EventRecord, index: number, array: EventRecord[]) => {
            let { section, method, data } = value.event;
            if (
                wgEvents.includes(method) && Object.keys(channelNames).includes(section)
                ||
                wgEvents.includes(method) && section === "joystreamUtility"
            ) {
                console.log(`Block=[${blockNumber}] [${section}.${method}] Event=${data.toJSON()}`);
                const channel = channels[section];
                if (!channel && section !== "joystreamUtility") {
                    console.log(`Channel not configured for [${section}]`);
                    return;
                }

                switch (method) {
                    case "ApplicationWithdrawn":
                        const withdrawnId = data[0] as ApplicationId;
                        const withdrawnApplicationKey = `${section}-${withdrawnId.toString()}`;
                        console.log(withdrawnApplicationKey);
                        const withdrawnApplication = await queryNodeClient.applicationById({ applicationId: withdrawnApplicationKey });

                        channel.forEach((ch: TextChannel, index: number, values: TextChannel[]) => 
                            ch.send({
                            embeds: [
                                getApplicationWithdrawnEmbed(
                                    withdrawnId,
                                    withdrawnApplication,
                                    blockNumber,
                                    value
                                ),
                            ],
                        }));
                        break;
                    case "AppliedOnOpening":
                        const applicationOpeningId = (data[0] as ApplyOnOpeningParameters).opening_id;
                        const applicantId = (data[0] as ApplyOnOpeningParameters).member_id;
                        const applicationId = data[1] as ApplicationId;
                        const application = await queryNodeClient.applicationById({ applicationId: applicationId.toString() });
                        const openingObject = await queryNodeClient.openingById({ openingId: `${section}-${applicationOpeningId.toString()}` });
                        const applicant = await queryNodeClient.memberById({ memberId: applicantId.toString() });
                        channel.forEach((ch: TextChannel, index: number, values: TextChannel[]) => 
                            ch.send({
                            embeds: [
                                getAppliedOnOpeningEmbed(
                                    applicationId,
                                    application,
                                    openingObject,
                                    applicant,
                                    blockNumber,
                                    value
                                ),
                            ],
                        }));
                        break;
                    case "BudgetSet":
                        const balance = (data[0] as Balance).toNumber();
                        channel.forEach((ch: TextChannel, index: number, values: TextChannel[]) => 
                            ch.send({
                            embeds: [
                                getBudgetSetEmbed(balance, blockNumber, value),
                            ],
                        }));
                        break;
                    case "UpdatedWorkingGroupBudget":
                        const budgetChange = (data[1] as Balance).toNumber();
                        const wg: WorkingGroup = data[0] as WorkingGroup;
                        console.log(wg.toHuman());
                        let dynamicChannel = null;

                        if (wg.isForum) {
                            dynamicChannel = channels["forumWorkingGroup"];
                        } else if (wg.isContent) {
                            dynamicChannel = channels["contentWorkingGroup"];
                        } else if (wg.isOperationsAlpha) {
                            dynamicChannel = channels["operationsWorkingGroupAlpha"];
                        } else if (wg.isMembership) {
                            dynamicChannel = channels["membershipWorkingGroup"];
                        } else if (wg.isOperationsBeta) {
                            dynamicChannel = channels["operationsWorkingGroupBeta"];
                        } else if (wg.isOperationsGamma) {
                            dynamicChannel = channels["operationsWorkingGroupGamma"];
                        } else if (wg.isStorage) {
                            dynamicChannel = channels["storageWorkingGroup"];
                        } else if (wg.isDistribution) {
                            dynamicChannel = channels["distributionWorkingGroup"];
                        } else if (wg.isGateway) {
                            dynamicChannel = channels["gatewayWorkingGroup"];
                        }
                        if (!dynamicChannel) {
                            console.log(`Channel not configured for [${section}]`);
                        } else {
                            dynamicChannel.send({
                                embeds: [
                                    getBudgetSetEmbed(budgetChange, blockNumber, value),
                                ],
                            });
                        }
                        break;
                    case "OpeningAdded":
                    case "OpeningCanceled":
                        const openingId = data[0] as OpeningId;
                        const openingIdKey = `${section}-${openingId.toString()}`;
                        console.log(openingIdKey);

                        let attempt = 1;
                        const maxAttempts = 3;
                        while(attempt <= maxAttempts) {
                            console.log(`Attempt ${attempt}/${maxAttempts} to fetch the opening ${openingId.toString()} from QN...`);
                            const qnOpeningObject = await queryNodeClient.openingById({ openingId: openingIdKey })
                            if (!qnOpeningObject || !qnOpeningObject.workingGroupOpeningByUniqueInput) {
                                console.log('Opening not found in QN');
                                await delay(6000);
                                attempt = attempt + 1;
                            } else {
                                if(method === "OpeningAdded") {
                                    channel.forEach((ch: TextChannel, index: number, values: TextChannel[]) => 
                                    ch.send({
                                        embeds: [
                                            getOpeningAddedEmbed(
                                                openingId,
                                                qnOpeningObject,
                                                blockNumber,
                                                value
                                            ),
                                        ],
                                    }));
                                } else {
                                    channel.forEach((ch: TextChannel, index: number, values: TextChannel[]) => 
                                        ch.send({
                                        embeds: [
                                            getOpeningCancelledEmbed(
                                                openingId,
                                                qnOpeningObject,
                                                blockNumber,
                                                value
                                            ),
                                        ],
                                    }));
                                }
                                break;
                            }
                        }
                        break;                        
                    case "OpeningFilled":
                        const filledOpeningId = data[0] as OpeningId;
                        const filledOpeningObject = await queryNodeClient.openingById({ openingId: `${section}-${filledOpeningId.toString()}` });
                        const hiredWorkers = Object.values<WorkerId>(JSON.parse(data[1].toString()));

                        hiredWorkers.map(async (id, index, values) => {
                            let attempt = 1;
                            const maxAttempts = 3;
                            while(attempt <= maxAttempts) {
                                console.log(`Attempt ${attempt}/${maxAttempts} to fetch the worker ${id} from QN...`);
                                const hiredWorker = await queryNodeClient.workerById({ workerId: `${section}-${id.toString()}` });
                                if(!hiredWorker || !hiredWorker.workerByUniqueInput) {
                                    await delay(6000);
                                    attempt = attempt + 1;
                                    continue;
                                }
                                console.log(hiredWorker.workerByUniqueInput.membership.handle);
                                channel.forEach((ch: TextChannel, index: number, values: TextChannel[]) => 
                                    ch.send({
                                        embeds: [
                                        getOpeningFilledEmbed(
                                            filledOpeningObject,
                                            hiredWorker,
                                            blockNumber,
                                            value
                                        ),
                                    ],
                                }));
                                break;     
                            }
                        });
                        break;
                    case "RewardPaid":
                        const paidWorkerId = data[0] as WorkerId;
                        const paidWorkerAffected = await queryNodeClient.workerById({ workerId: `${section}-${paidWorkerId.toString()}` });
                        const paidReward = data[2] as Balance;
                        const isRewardMissed = (data[3] as RewardPaymentType).isMissedReward;
                        channel.forEach((ch: TextChannel, index: number, values: TextChannel[]) => 
                            ch.send({
                            embeds: [
                                getWorkerRewardedEmbed(
                                    paidReward,
                                    paidWorkerAffected,
                                    isRewardMissed,
                                    blockNumber,
                                    value
                                ),
                            ],
                        }));
                        break;
                    case "WorkerRewardAmountUpdated":
                        const workerId = data[0] as WorkerId;
                        const workerAffected = await queryNodeClient.workerById({ workerId: `${section}-${workerId.toString()}` });
                        const reward = (data[1] as Option<Balance>).unwrapOr(0 as unknown as Balance);
                        channel.forEach((ch: TextChannel, index: number, values: TextChannel[]) => 
                            ch.send({
                            embeds: [
                                getWorkerRewardAmountUpdatedEmbed(
                                    reward,
                                    workerAffected,
                                    blockNumber,
                                    value
                                ),
                            ],
                        }));
                        break;
                    case "TerminatedLeader":
                    case "TerminatedWorker":
                        const terminatedId = data[0] as WorkerId;
                        const terminatedWorkerKey = `${section}-${terminatedId.toString()}`;

                        const terminatedIdWorker = await queryNodeClient.workerById({ workerId: terminatedWorkerKey });
                        channel.forEach((ch: TextChannel, index: number, values: TextChannel[]) => 
                            ch.send({
                            embeds: [
                                getWorkerTerminatedEmbed(
                                    terminatedIdWorker,
                                    blockNumber,
                                    value
                                ),
                            ],
                        }));
                        break;
                    case "WorkerExited":
                        const exitedId = data[0] as WorkerId;
                        const exitedWorkerKey = `${section}-${exitedId.toString()}`;
                        console.log(exitedWorkerKey);

                        const exitedMember = await queryNodeClient.workerById({ workerId: exitedWorkerKey });
                        channel.forEach((ch: TextChannel, index: number, values: TextChannel[]) => 
                            ch.send({
                            embeds: [
                                getWorkerExitedEmbed(
                                    exitedMember,
                                    blockNumber,
                                    value
                                ),
                            ],
                        }));
                        break;
                    case "LeaderSet":
                        const leaderId = data[0] as WorkerId;
                        const leaderWorker = await queryNodeClient.workerById({ workerId: `${section}-${leaderId.toString()}` });
                        channel.forEach((ch: TextChannel, index: number, values: TextChannel[]) => 
                            ch.send({
                            embeds: [getLeaderSetEmbed(leaderWorker, blockNumber, value)],
                        }));
                        break;
                    case "LeaderUnset":
                        channel.forEach((ch: TextChannel, index: number, values: TextChannel[]) => 
                            ch.send({ embeds: [getLeaderUnsetEmbed(blockNumber, value)] })
                        );
                        break;
                    case "StakeDecreased":
                    case "StakeIncreased":
                    case "StakeSlashed":
                        const stakeWorkerId = data[0] as WorkerId;
                        const stakeWorker = await queryNodeClient.workerById({ workerId: `${section}-${stakeWorkerId.toString()}` });
                        const stake = data[1] as Balance;

                        channel.forEach((ch: TextChannel, index: number, values: TextChannel[]) => 
                            ch.send({
                            embeds: [
                                getStakeUpdatedEmbed(
                                    stake,
                                    stakeWorker,
                                    method.replace("Stake", ""),
                                    blockNumber,
                                    value
                                ),
                            ],
                        }));
                        break;
                }
            }
        }
    );