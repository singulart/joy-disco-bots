import { joystreamBlue } from '../../config'
import { formatBalance } from '@polkadot/util';
import { EventRecord } from '@polkadot/types/interfaces';
import Discord from 'discord.js';
import { OpeningId, ApplicationId, Application } from "@joystream/types/working-group";
import { Balance } from '@joystream/types/common';
import { OpeningByIdQuery, WorkerByIdQuery, ApplicationByIdQuery, MemberByIdQuery } from '../qntypes';


export const getBudgetSetEmbed = (balanceSet: number, blockNumber: number, event: EventRecord): Discord.MessageEmbed => {

  return addCommonProperties(new Discord.MessageEmbed()
    .setTitle(`💰 💵 💸 💴 💶 ${formatBalance(balanceSet, { withUnit: 'tJOY' })} added to the Treasury 💰 💵 💸 💴 💶 `)
    , blockNumber, event);
}

export const getOpeningAddedEmbed = (id: OpeningId, opening: OpeningByIdQuery, blockNumber: number, event: EventRecord): Discord.MessageEmbed => {
  const openingData = opening.workingGroupOpeningByUniqueInput;
  const description = openingData.metadata.description ?
    openingData.metadata.description : openingData.metadata.shortDescription;
  return addCommonProperties(new Discord.MessageEmbed()
    .setTitle(`⛩ ${safeOpeningTitle(opening, id.toString())} ⛩`)
    .setDescription(description || 'Not Set')
    .addFields(
      { name: 'ID', value: id.toString(), inline: true },
      { name: 'Reward', value: openingData.rewardPerBlock.toString(), inline: true },
      { name: 'Application Stake', value: openingData.stakeAmount.toString(), inline: true },
    ), blockNumber, event);
}

export const getOpeningCancelledEmbed = (id: OpeningId, opening: OpeningByIdQuery, blockNumber: number, event: EventRecord): Discord.MessageEmbed => {
  const openingData = opening.workingGroupOpeningByUniqueInput;
  return addCommonProperties(new Discord.MessageEmbed()
    .setTitle(`⛩ Opening ${safeOpeningTitle(opening, id.toString())} was cancelled⛩`)
    , blockNumber, event);
}

export const getOpeningFilledEmbed = (opening: OpeningByIdQuery, member: WorkerByIdQuery, blockNumber: number, event: EventRecord): Discord.MessageEmbed => {

  return addCommonProperties(
    new Discord.MessageEmbed()
      .setTitle(
        `🎉 🥳 👏🏻 ${member.workerByUniqueInput.membership.handle} was hired for opening '${safeOpeningTitle(opening, getOpeningId(opening))}' 🎉 🥳 👏🏻`)
    , blockNumber, event);
}

export const getAppliedOnOpeningEmbed = (applicationId: ApplicationId, application: ApplicationByIdQuery,
  opening: OpeningByIdQuery, applicant: MemberByIdQuery, blockNumber: number, event: EventRecord): Discord.MessageEmbed => {

  return addCommonProperties(new Discord.MessageEmbed()
    .setTitle(`🏛 ${applicant.memberships[0].handle} applied to opening ${safeOpeningTitle(opening, getOpeningId(opening))}`)
    .addFields(
      { name: 'Application ID', value: applicationId.toString(), inline: true },
      { name: 'Opening', value: getOpeningId(opening), inline: true },
      { name: 'Member ID', value: `[${applicant.memberships[0].id}]`, inline: true },
    ), blockNumber, event);
}


export const getWorkerRewardAmountUpdatedEmbed = (reward: Balance, member: WorkerByIdQuery,
  blockNumber: number, event: EventRecord): Discord.MessageEmbed => {

  return addCommonProperties(new Discord.MessageEmbed()
    .setTitle(`💰💰💰 Salary of ${member.workerByUniqueInput.membership.handle} updated`)
    .addFields(
      { name: 'Salary', value: formatBalance(reward, { withUnit: 'tJOY' }), inline: true }
    ), blockNumber, event);
}

export const getWorkerRewardedEmbed = (reward: Balance, member: WorkerByIdQuery, missed: boolean,
  blockNumber: number, event: EventRecord): Discord.MessageEmbed => {

  return addCommonProperties(new Discord.MessageEmbed()
    .setTitle(`💰💰💰 Remuneration for ${member.workerByUniqueInput.membership.handle} ${missed ? 'FAILED!' : 'paid successfully'}`)
    .addFields(
      { name: `Amount ${missed ? 'missed' : 'paid'}`, value: formatBalance(reward, { withUnit: 'tJOY' }), inline: true }
    ), blockNumber, event);
}

export const getLeaderSetEmbed = (member: WorkerByIdQuery, blockNumber: number, event: EventRecord): Discord.MessageEmbed => {

  return addCommonProperties(new Discord.MessageEmbed().setTitle(`🏛 ${member.workerByUniqueInput.membership.handle} is a new Lead`), blockNumber, event);
}

export const getLeaderUnsetEmbed = (blockNumber: number, event: EventRecord): Discord.MessageEmbed => {

  return addCommonProperties(new Discord.MessageEmbed().setTitle(`🏛 Leader was unset`), blockNumber, event);
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
    , blockNumber, event);
}

export const getApplicationWithdrawnEmbed = (applicationId: ApplicationId, application: ApplicationByIdQuery,
  blockNumber: number, event: EventRecord): Discord.MessageEmbed => {

  return addCommonProperties(new Discord.MessageEmbed()
    .setTitle(`🏛 Application of ${application.workingGroupApplicationByUniqueInput.applicant.handle} withdrawn`)
    .addFields(
      { name: 'Application ID', value: applicationId.toString(), inline: true },
      { name: 'Opening ID', value: application.workingGroupApplicationByUniqueInput.openingId, inline: true },
    ), blockNumber, event);
}

export const getStakeUpdatedEmbed = (stake: Balance | null, member: WorkerByIdQuery, action: string, blockNumber: number, event: EventRecord): Discord.MessageEmbed => {

  return addCommonProperties(new Discord.MessageEmbed()
    .setTitle(`💰💰💰 ${member.workerByUniqueInput.membership.handle}'s stake has been ${action}`)
    .addFields(
      { name: 'Amount', value: stake ? formatBalance(stake, { withUnit: 'tJOY' }) : 'Not Set', inline: true }
    ), blockNumber, event);
}

const addCommonProperties = (embed: Discord.MessageEmbed, blockNumber: number, event: EventRecord) => {
  return embed.addFields(
    { name: 'Block', value: blockNumber + "", inline: true },
    { name: 'Tx', value: event.hash.toString(), inline: true },
  )
    .setColor(joystreamBlue)
    .setTimestamp();
}

function safeOpeningTitle(opening: OpeningByIdQuery, id: string): string {
  return opening.workingGroupOpeningByUniqueInput.metadata.title || `Untitled #${id}`
}
function getOpeningId(opening: OpeningByIdQuery): string {
  return opening.workingGroupOpeningByUniqueInput.id;
}

