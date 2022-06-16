import { EventRecord } from "@polkadot/types/interfaces";
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
import { wgEvents, channelNames } from "../../config";
import { DiscordChannels } from "../types";
import type { Option } from '@polkadot/types';

import { ApplicationId, ApplyOnOpeningParameters, OpeningId, WorkingGroup, RewardPaymentType } from "@joystream/types/augment/all/types";
import { WorkerId } from "@joystream/types/working-group";
import { Balance } from "@joystream/types/common";
import { TextChannel } from "discord.js";
import { RetryableGraphQLClient } from "src/gql/graphql.client";


export const processGroupEvents = (
  blockNumber: number,
  events: EventRecord[],
  channels: DiscordChannels,
  queryNodeClient: RetryableGraphQLClient
) =>
  events.forEach(
    async (value: EventRecord) => {
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
            const withdrawnApplication = await queryNodeClient.applicationById(withdrawnApplicationKey);

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
            const openingObject = await queryNodeClient.openingById(`${section}-${applicationOpeningId.toString()}`);
            const applicant = await queryNodeClient.memberById(applicantId.toString());
            channel.forEach((ch: TextChannel, index: number, values: TextChannel[]) =>
              ch.send({
                embeds: [
                  getAppliedOnOpeningEmbed(
                    applicationId,
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
            let dynamicChannels: TextChannel[] = [];

            if (wg.isForum) {
              dynamicChannels = channels["forumWorkingGroup"];
            } else if (wg.isContent) {
              dynamicChannels = channels["contentWorkingGroup"];
            } else if (wg.isOperationsAlpha) {
              dynamicChannels = channels["operationsWorkingGroupAlpha"];
            } else if (wg.isMembership) {
              dynamicChannels = channels["membershipWorkingGroup"];
            } else if (wg.isOperationsBeta) {
              dynamicChannels = channels["operationsWorkingGroupBeta"];
            } else if (wg.isOperationsGamma) {
              dynamicChannels = channels["operationsWorkingGroupGamma"];
            } else if (wg.isStorage) {
              dynamicChannels = channels["storageWorkingGroup"];
            } else if (wg.isDistribution) {
              dynamicChannels = channels["distributionWorkingGroup"];
            } else if (wg.isGateway) {
              dynamicChannels = channels["gatewayWorkingGroup"];
            }
            if (!dynamicChannels || dynamicChannels.length == 0) {
              console.log(`Channel not configured for [${section}]`);
            } else {
              dynamicChannels.forEach((ch: TextChannel, index: number, values: TextChannel[]) =>
                ch.send({
                  embeds: [
                    getBudgetSetEmbed(budgetChange, blockNumber, value),
                  ],
                }));
            }
            break;
          case "OpeningAdded":
          case "OpeningCanceled":
            const openingId = data[0] as OpeningId;
            const openingIdKey = `${section}-${openingId.toString()}`;
            console.log(openingIdKey);

            const qnOpeningObject = await queryNodeClient.openingById(openingIdKey)
            if (!qnOpeningObject || !qnOpeningObject.workingGroupOpeningByUniqueInput) {
              console.log('Opening not found in QN');
            } else {
              if (method === "OpeningAdded") {
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
            }
            break;
          case "OpeningFilled":
            const filledOpeningId = data[0] as OpeningId;
            const filledOpeningObject = await queryNodeClient.openingById(`${section}-${filledOpeningId.toString()}`);
            const hiredWorkers = Object.values<WorkerId>(JSON.parse(data[1].toString()));

            hiredWorkers.map(async (id, index, values) => {
              const hiredWorker = await queryNodeClient.workerById(`${section}-${id.toString()}`);
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
            });
            break;
          case "RewardPaid":
            const paidWorkerId = data[0] as WorkerId;
            const paidWorkerAffected = await queryNodeClient.workerById(`${section}-${paidWorkerId.toString()}`);
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
            const workerAffected = await queryNodeClient.workerById(`${section}-${workerId.toString()}`);
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
            const terminatedIdWorker = await queryNodeClient.workerById(terminatedWorkerKey);
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

            const exitedMember = await queryNodeClient.workerById(exitedWorkerKey);
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
            const leaderWorker = await queryNodeClient.workerById(`${section}-${leaderId.toString()}`);
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
            const stakeWorker = await queryNodeClient.workerById(`${section}-${stakeWorkerId.toString()}`);
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