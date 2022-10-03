import { ProposalId } from '@joystream/types/primitives';
import { Vec } from '@polkadot/types';
import { ITuple } from '@polkadot/types/types';
import { Balance } from '@polkadot/types/interfaces/runtime';
import { PalletCommonBalanceKind, PalletProposalsCodexGeneralProposalParams } from '@polkadot/types/lookup';
import { PalletProposalsCodexProposalDetails } from '@polkadot/types/lookup';
import { PalletCommonFundingRequestParameters } from '@polkadot/types/lookup';
import { PalletCommonWorkingGroup } from '@polkadot/types/lookup';
import Discord from 'discord.js';
import { joystreamBlue } from '../../config';
import { hexToString, formatBalance } from '@polkadot/util';

formatBalance.setDefaults({
  decimals: 9, //TODO clarify
  unit: 'JOY',
})

export function getProposalCreatedEmbed(
  proposalId: ProposalId | undefined,
  generalInformation: PalletProposalsCodexGeneralProposalParams | undefined,
  proposalDetails: PalletProposalsCodexProposalDetails | undefined,
  authorHandleOrId: string): Discord.MessageEmbed {

  if (proposalDetails?.isSignal) {
    return getSignalProposalCreatedEmbed(proposalId, generalInformation, proposalDetails.asSignal.toString(), authorHandleOrId);
  } else if (proposalDetails?.isFundingRequest) {
    return getFundingProposalCreatedEmbed(proposalId, generalInformation, proposalDetails.asFundingRequest, authorHandleOrId);
  } else if (proposalDetails?.isUpdateWorkingGroupBudget) {
    return getWgBudgetProposalCreatedEmbed(proposalId, generalInformation, proposalDetails.asUpdateWorkingGroupBudget, authorHandleOrId);
  } else {
    return new Discord.MessageEmbed()
    .setTitle(`🏛 New Proposal '${hexToString(generalInformation?.title.toString()) || ''}' Created`)
    .addFields([
      { name: 'Link', value: proposalUrl(proposalId?.toString() || ''), inline: true },
      { name: 'Author', value: authorHandleOrId, inline: true }
    ])
    .setColor(joystreamBlue)
    .setTimestamp();
  }
}

function getSignalProposalCreatedEmbed(
  proposalId: ProposalId | undefined,
  generalInformation: PalletProposalsCodexGeneralProposalParams | undefined,
  signal: string,
  authorHandleOrId: string): Discord.MessageEmbed {

  return new Discord.MessageEmbed()
    .setTitle(`🏛 Signal Proposal '${hexToString(generalInformation?.title.toString()) || ''}' Created`)
    .setDescription(hexToString(signal))
    .addFields([
      { name: 'Link', value: proposalUrl(proposalId?.toString() || ''), inline: true },
      { name: 'Author', value: authorHandleOrId, inline: true }
    ])
    .setColor(joystreamBlue)
    .setTimestamp();
}

function getFundingProposalCreatedEmbed(
  proposalId: ProposalId | undefined,
  generalInformation: PalletProposalsCodexGeneralProposalParams | undefined,
  fundingData: Vec<PalletCommonFundingRequestParameters>,
  authorHandleOrId: string): Discord.MessageEmbed {

  const fundingInfo = fundingData.map(
    funding => `${formatBalance(funding.amount.toString())} ➡️ ${funding.account.toString()}`).join('\n');
  return new Discord.MessageEmbed()
    .setTitle(`🏛 Funding Proposal '${hexToString(generalInformation?.title.toString()) || ''}' Created`)
    .setDescription(hexToString(generalInformation?.description.toString()) || 'N/A')
    .addFields([
      { name: 'Link', value: proposalUrl(proposalId?.toString() || ''), inline: true },
      { name: 'Author', value: authorHandleOrId, inline: true },
      { name: 'Funding', value: fundingInfo, inline: true}
    ])
    .setColor(joystreamBlue)
    .setTimestamp();
}

function getWgBudgetProposalCreatedEmbed(
  proposalId: ProposalId | undefined,
  generalInformation: PalletProposalsCodexGeneralProposalParams | undefined,
  budgetData: ITuple<[Balance, PalletCommonWorkingGroup, PalletCommonBalanceKind]>,
  authorHandleOrId: string): Discord.MessageEmbed {

  return new Discord.MessageEmbed()
    .setTitle(`${budgetData[2].isNegative ? 'DECREASE' : 'Update'} ${budgetData[1].toString()} budget by ${formatBalance(budgetData[0].toString())}`)
    .addFields([
      { name: 'Link', value: proposalUrl(proposalId?.toString() || ''), inline: true },
      { name: 'Author', value: authorHandleOrId, inline: true },
    ])
    .setColor(joystreamBlue)
    .setTimestamp();
}

export function getProposalDecidedEmbed(proposalId: ProposalId | undefined, decision: string): Discord.MessageEmbed {
  return new Discord.MessageEmbed()
    .setTitle(`Proposal ${proposalId?.toString()} ${decision}`)
    .addFields([
      { name: 'Link', value: proposalUrl(proposalId?.toString() || ''), inline: true },
    ])
    .setColor(joystreamBlue)
    .setTimestamp();
}

export function getVotedEmbed(proposalId: ProposalId | undefined, voter: string, vote: string, rationale: string): Discord.MessageEmbed {
  return new Discord.MessageEmbed()
    .setTitle(`Proposal ${proposalId?.toString()} got ${vote} vote`)
    .setDescription(rationale)
    .addFields([
      { name: 'Link', value: proposalUrl(proposalId?.toString() || ''), inline: true },
      { name: 'Voter CM', value: voter, inline: true }, 
    ])
    .setColor(joystreamBlue)
    .setTimestamp();
}

function proposalUrl(id: string) {
  return `https://dao.joystream.org/#/proposals/preview/${id}`;
}