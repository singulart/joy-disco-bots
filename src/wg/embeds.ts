import { joystreamBlue } from '../../config'
import { formatBalance } from '@polkadot/util';
import { EventRecord } from '@polkadot/types/interfaces';
import Discord from 'discord.js';
import { OpeningId, ApplicationId, Application } from "@joystream/types/working-group";
import { Balance } from '@joystream/types/common';
import { OpeningByIdQuery, WorkerByIdQuery, ApplicationByIdQuery, MemberByIdQuery } from '../qntypes';


export const getBudgetSetEmbed = (balanceSet: number, blockNumber: number, event: EventRecord): Discord.MessageEmbed => {

    return addCommonProperties(new Discord.MessageEmbed()
        .setTitle(`💰 💵 💸 💴 💶 ${formatBalance(balanceSet, { withUnit: 'JOY' })} added to the Treasury 💰 💵 💸 💴 💶 `)
        , blockNumber, event );
}

export const getOpeningAddedEmbed = (id: OpeningId, opening: OpeningByIdQuery, blockNumber: number, event: EventRecord): Discord.MessageEmbed => {
    const openingData = opening.workingGroupOpeningByUniqueInput;
    const description = openingData.metadata.description ? 
        openingData.metadata.description : openingData.metadata.shortDescription;
    return addCommonProperties(new Discord.MessageEmbed()
        .setTitle(`⛩ ${opening.workingGroupOpeningByUniqueInput.metadata.title} ⛩`)
        .setDescription(description)
        .addFields(
            { name: 'ID', value: id.toString(), inline: true },
            { name: 'Reward', value: openingData.rewardPerBlock.toString(), inline: true },
            { name: 'Application Stake', value: openingData.stakeAmount.toString(), inline: true },
            // { name: 'Created By', value: opening.creator.membership.handle, inline: true },
        ), blockNumber, event );
}

export const getOpeningFilledEmbed = (opening: OpeningByIdQuery, member: WorkerByIdQuery, blockNumber: number, event: EventRecord): Discord.MessageEmbed => {

    return addCommonProperties(
        new Discord.MessageEmbed()
        .setTitle(
            `🎉 🥳 👏🏻 ${member.workerByUniqueInput.membership.handle} was hired for opening '${opening.workingGroupOpeningByUniqueInput.metadata.title}' 🎉 🥳 👏🏻`)
        , blockNumber, event );
}

export const getAppliedOnOpeningEmbed = (applicationId: ApplicationId, application: ApplicationByIdQuery, 
    opening: OpeningByIdQuery, applicant: MemberByIdQuery, blockNumber: number, event: EventRecord): Discord.MessageEmbed => {

    return addCommonProperties(new Discord.MessageEmbed()
        .setTitle(`🏛 ${applicant.memberships[0].handle} applied to opening ${opening.workingGroupOpeningByUniqueInput.metadata.title}`)
        .addFields(
            { name: 'Application ID', value: applicationId.toString(), inline: true},
            { name: 'Opening', value:  opening.workingGroupOpeningByUniqueInput.metadata.id, inline: true},
            { name: 'Member ID', value: `[${applicant.memberships[0].id}]`, inline: true},
        ), blockNumber, event );
}


export const getWorkerRewardAmountUpdatedEmbed = (reward: Balance, member: WorkerByIdQuery, 
    blockNumber: number, event: EventRecord): Discord.MessageEmbed => {

    return addCommonProperties(new Discord.MessageEmbed()
        .setTitle(`💰💰💰 Salary of ${member.workerByUniqueInput.membership.handle} updated`)
        .addFields(
            { name: 'Salary', value: formatBalance(reward, { withUnit: 'JOY' }), inline: true }
        ), blockNumber, event );
}

export const getLeaderSetEmbed = (member: WorkerByIdQuery, blockNumber: number, event: EventRecord): Discord.MessageEmbed => {

    return addCommonProperties(new Discord.MessageEmbed().setTitle(`🏛 ${member.workerByUniqueInput.membership.handle} is a new Lead`), blockNumber, event );
}

export const getLeaderUnsetEmbed = (blockNumber: number, event: EventRecord): Discord.MessageEmbed => {

    return addCommonProperties(new Discord.MessageEmbed().setTitle(`🏛 Leader was unset`), blockNumber, event );
}

export const getWorkerTerminatedEmbed = (member: WorkerByIdQuery,
    blockNumber: number, event: EventRecord): Discord.MessageEmbed => {
    return getWorkerExitedOrTerminatedEmbed('been terminated', member, blockNumber, event);
}

export const getWorkerExitedEmbed = (member: WorkerByIdQuery,
    blockNumber: number, event: EventRecord): Discord.MessageEmbed => {
    return getWorkerExitedOrTerminatedEmbed('exited', member, blockNumber, event);
}

export const getWorkerExitedOrTerminatedEmbed = (action: string, member: WorkerByIdQuery,
    blockNumber: number, event: EventRecord): Discord.MessageEmbed => {

    return addCommonProperties(new Discord.MessageEmbed()
        .setTitle(`🏛 Worker ${member.workerByUniqueInput.membership.handle} has ${action}`)
        , blockNumber, event );
}

export const getApplicationWithdrawnEmbed = (applicationId: ApplicationId, application: ApplicationByIdQuery,
    blockNumber: number, event: EventRecord): Discord.MessageEmbed => {

    return addCommonProperties(new Discord.MessageEmbed()
        .setTitle(`🏛 Application of ${application.workingGroupApplicationByUniqueInput.applicant.handle} withdrawn`)
        .addFields(
            { name: 'Application ID', value: applicationId.toString(), inline: true },
            { name: 'Opening ID', value: application.workingGroupApplicationByUniqueInput.openingId, inline: true },
        ), blockNumber, event );
}

export const getStakeUpdatedEmbed = (stake: Balance | null, member: WorkerByIdQuery, action: string, blockNumber: number, event: EventRecord): Discord.MessageEmbed => {
    
    return addCommonProperties(new Discord.MessageEmbed()
        .setTitle(`💰💰💰 ${member.workerByUniqueInput.membership.handle}'s stake has been ${action}`)
        .addFields(
            { name: 'Amount', value: stake ? formatBalance(stake, { withUnit: 'JOY' }) : 'Not Set', inline: true }
        ), blockNumber, event );
}

const addCommonProperties = (embed: Discord.MessageEmbed, blockNumber: number, event: EventRecord) => {
    return embed.addFields(
        { name: 'Block', value: blockNumber + "", inline: true },
        { name: 'Tx', value: event.hash.toString(), inline: true },
    )
    .setColor(joystreamBlue)
    .setTimestamp();
}