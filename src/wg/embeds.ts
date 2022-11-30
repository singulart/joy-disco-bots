import { joystreamBlue } from '../../config'
import { formatBalance } from '@polkadot/util';
import { EventRecord } from '@polkadot/types/interfaces';
import Discord from 'discord.js';
import { OpeningId, ApplicationId } from '@joystream/types/primitives';
import { Balance } from '@polkadot/types/interfaces';
import { OpeningByIdQuery, WorkerByIdQuery, ApplicationByIdQuery, MemberByIdQuery, WorkersByAccountQuery } from '../qntypes';
import { EventWithBlock } from 'src/types';

formatBalance.setDefaults({
  decimals: 10, //TODO clarify
  unit: 'JOY',
})

export function getBudgetSetEmbed(balanceSet: number, blockNumber: number, event: EventRecord): Discord.MessageEmbed {

  return addCommonProperties(new Discord.MessageEmbed()
    .setTitle(`💰 💵 💸 💴 💶 ${formatBalance(balanceSet)} added to the Treasury 💰 💵 💸 💴 💶 `)
    , blockNumber, event);
}

export function getOpeningAddedEmbed(id: OpeningId, opening: OpeningByIdQuery, blockNumber: number, event: EventRecord): Discord.MessageEmbed {
  const openingData = opening.workingGroupOpeningByUniqueInput;
  const description = openingData?.metadata.description ?
    openingData.metadata.description : openingData?.metadata.shortDescription;
  return addCommonProperties(new Discord.MessageEmbed()
    .setTitle(`⛩ ${safeOpeningTitle(opening, id.toString())} ⛩`)
    .setDescription(description || 'Not Set')
    .addFields(
      { name: 'ID', value: id.toString(), inline: true },
      { name: 'Reward', value: openingData?.rewardPerBlock.toString(), inline: true },
      { name: 'Application Stake', value: formatBalance(openingData?.stakeAmount.toString()), inline: true },
    ), blockNumber, event);
}

export function getOpeningCancelledEmbed(id: OpeningId, opening: OpeningByIdQuery, blockNumber: number, event: EventRecord): Discord.MessageEmbed {
  return addCommonProperties(new Discord.MessageEmbed()
    .setTitle(`⛩ Opening ${safeOpeningTitle(opening, id.toString())} was cancelled⛩`)
    , blockNumber, event);
}

export function getOpeningFilledEmbed(opening: OpeningByIdQuery, member: WorkerByIdQuery, blockNumber: number, event: EventRecord): Discord.MessageEmbed {

  return addCommonProperties(
    new Discord.MessageEmbed()
      .setTitle(
        `🎉 🥳 👏🏻 ${member.workerByUniqueInput?.membership.handle} was hired for opening '${safeOpeningTitle(opening, getOpeningId(opening))}' 🎉 🥳 👏🏻`)
    , blockNumber, event);
}

export function getAppliedOnOpeningEmbed(applicationId: ApplicationId,
  opening: OpeningByIdQuery, applicant: MemberByIdQuery, blockNumber: number, event: EventRecord): Discord.MessageEmbed {

  return addCommonProperties(new Discord.MessageEmbed()
    .setTitle(`🏛 ${applicant.memberships[0].handle} applied to opening ${safeOpeningTitle(opening, getOpeningId(opening))}`)
    .addFields(
      { name: 'Application ID', value: applicationId.toString(), inline: true },
      { name: 'Opening', value: getOpeningId(opening), inline: true },
      { name: 'Member ID', value: `[${applicant.memberships[0].id}]`, inline: true },
    ), blockNumber, event);
}


export function getWorkerRewardAmountUpdatedEmbed(reward: Balance, member: WorkerByIdQuery,
  blockNumber: number, event: EventRecord): Discord.MessageEmbed {

  return addCommonProperties(new Discord.MessageEmbed()
    .setTitle(`💰💰💰 Salary of ${member.workerByUniqueInput?.membership.handle} updated`)
    .addFields(
      { name: 'Salary', value: formatBalance(reward.toString()), inline: true }
    ), blockNumber, event);
}

export function getDiscretionarySpendingEmbed(spending: Balance, recipient: WorkersByAccountQuery,
  blockNumber: number, event: EventRecord): Discord.MessageEmbed {

  return addCommonProperties(new Discord.MessageEmbed()
    .setTitle(`💰💰💰 User ${recipient.workers[0].membership.handle} was paid via discretionary budget spending`)
    .addFields(
      { name: 'Amount paid', value: formatBalance(spending.toString()), inline: true }
    ), blockNumber, event);
}

export function getDiscretionarySpendingToNonWorkerAddressEmbed(spending: Balance, recipientAddress: string,
  blockNumber: number, event: EventRecord): Discord.MessageEmbed {

  return addCommonProperties(new Discord.MessageEmbed()
    .setTitle(`💰💰💰 Discretionary budget spending was made`)
    .addFields(
      { name: 'Amount paid', value: formatBalance(spending.toString()), inline: true },
      { name: 'Recipient', value: recipientAddress, inline: true }
    ), blockNumber, event);
}


export function getWorkerRewardedEmbed(reward: Balance, member: WorkerByIdQuery, missed: boolean,
  blockNumber: number, event: EventRecord): Discord.MessageEmbed {

  return addCommonProperties(new Discord.MessageEmbed()
    .setTitle(`💰💰💰 Remuneration${missed ? ' debt' : ''} for ${member.workerByUniqueInput?.membership.handle} paid successfully`)
    .addFields(
      { name: `Amount paid`, value: formatBalance(reward.toString()), inline: true }
    ), blockNumber, event);
}

export function getLeaderSetEmbed(member: WorkerByIdQuery, blockNumber: number, event: EventRecord): Discord.MessageEmbed {

  return addCommonProperties(new Discord.MessageEmbed().setTitle(`🏛 ${member.workerByUniqueInput?.membership.handle} is a new Lead`), blockNumber, event);
}

export function getLeaderUnsetEmbed(blockNumber: number, event: EventRecord): Discord.MessageEmbed {

  return addCommonProperties(new Discord.MessageEmbed().setTitle(`🏛 Leader was unset`), blockNumber, event);
}

export function getWorkerTerminatedEmbed(member: WorkerByIdQuery, payload: EventWithBlock): Discord.MessageEmbed {
  return getWorkerExitedOrTerminatedEmbed('been terminated', member, payload);
}

export function getWorkerExitedEmbed(member: WorkerByIdQuery, payload: EventWithBlock): Discord.MessageEmbed {
  return getWorkerExitedOrTerminatedEmbed('exited', member, payload);
}

export function getWorkerExitedOrTerminatedEmbed(action: string, member: WorkerByIdQuery, payload: EventWithBlock): Discord.MessageEmbed {

  return addCommonProperties(new Discord.MessageEmbed()
    .setTitle(`🏛 Worker ${member.workerByUniqueInput?.membership.handle} has ${action}`)
    , payload.block, payload.event);
}

export function getApplicationWithdrawnEmbed(applicationId: ApplicationId, application: ApplicationByIdQuery,
  blockNumber: number, event: EventRecord): Discord.MessageEmbed {

  return addCommonProperties(new Discord.MessageEmbed()
    .setTitle(`🏛 Application of ${application.workingGroupApplicationByUniqueInput?.applicant.handle} withdrawn`)
    .addFields(
      { name: 'Application ID', value: applicationId.toString() || 'Not Set', inline: true },
      { name: 'Opening ID', value: application.workingGroupApplicationByUniqueInput?.openingId || 'Not Set', inline: true },
    ), blockNumber, event);
}

export function getStakeUpdatedEmbed(stake: Balance | null, member: WorkerByIdQuery, action: string, blockNumber: number, event: EventRecord): Discord.MessageEmbed {

  return addCommonProperties(new Discord.MessageEmbed()
    .setTitle(`💰💰💰 ${member.workerByUniqueInput?.membership.handle}'s stake has been ${action}`)
    .addFields(
      { name: 'Amount', value: stake ? formatBalance(stake.toString()) : 'Not Set', inline: true }
    ), blockNumber, event);
}

function addCommonProperties(embed: Discord.MessageEmbed, blockNumber: number, event: EventRecord) {
  return embed.addFields(
    { name: 'Block', value: blockNumber + '', inline: true },
    { name: 'Tx', value: event.hash.toString(), inline: true },
  )
    .setColor(joystreamBlue)
    .setTimestamp();
}

function safeOpeningTitle(opening: OpeningByIdQuery, id: string): string {
  return opening.workingGroupOpeningByUniqueInput?.metadata.title || `Untitled #${id}`
}
function getOpeningId(opening: OpeningByIdQuery): string {
  return opening.workingGroupOpeningByUniqueInput?.id || 'Not Set';
}

