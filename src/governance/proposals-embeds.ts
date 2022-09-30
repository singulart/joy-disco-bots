import { ProposalId } from '@joystream/types/primitives';
import { Vec } from '@polkadot/types';
import { ITuple } from '@polkadot/types/types';
import { Balance } from '@polkadot/types/interfaces/runtime';
import { PalletCommonBalanceKind, PalletProposalsCodexGeneralProposalParams } from "@polkadot/types/lookup";
import { PalletProposalsCodexProposalDetails } from "@polkadot/types/lookup";
import { PalletCommonFundingRequestParameters } from "@polkadot/types/lookup";
import { PalletCommonWorkingGroup } from "@polkadot/types/lookup";
import Discord from 'discord.js';
import { joystreamBlue } from '../../config';

export function getProposalCreatedEmbed(
  proposalId: ProposalId | undefined,
  generalInformation: PalletProposalsCodexGeneralProposalParams | undefined,
  proposalDetails: PalletProposalsCodexProposalDetails | undefined): Discord.MessageEmbed {

  if (proposalDetails?.isSignal) {
    return getSignalProposalCreatedEmbed(proposalId, generalInformation, proposalDetails.toString());
  } else if (proposalDetails?.isFundingRequest) {
    return getFundingProposalCreatedEmbed(proposalId, generalInformation, proposalDetails.asFundingRequest);
  } else if (proposalDetails?.isUpdateWorkingGroupBudget) {
    return getWgBudgetProposalCreatedEmbed(proposalId, generalInformation, proposalDetails.asUpdateWorkingGroupBudget);
  } else {
    return new Discord.MessageEmbed()
    .setTitle(`🏛 New Proposal '${generalInformation?.title.toString() || ''}' Created`)
    .addFields([
      { name: 'Link', value: proposalUrl(proposalId?.toString() || ''), inline: true },
      { name: 'Author', value: generalInformation?.memberId.toString() || 'N/A', inline: true }
    ])
    .setColor(joystreamBlue)
    .setTimestamp();
  }
}

export function getSignalProposalCreatedEmbed(
  proposalId: ProposalId | undefined,
  generalInformation: PalletProposalsCodexGeneralProposalParams | undefined,
  signal: string): Discord.MessageEmbed {

  return new Discord.MessageEmbed()
    .setTitle(`🏛 Signal Proposal '${generalInformation?.title.toString() || ''}' Created`)
    .setDescription(signal)
    .addFields([
      { name: 'Link', value: proposalUrl(proposalId?.toString() || ''), inline: true },
      { name: 'Author', value: generalInformation?.memberId.toString() || 'N/A', inline: true }
    ])
    .setColor(joystreamBlue)
    .setTimestamp();
}

export function getFundingProposalCreatedEmbed(
  proposalId: ProposalId | undefined,
  generalInformation: PalletProposalsCodexGeneralProposalParams | undefined,
  fundingData: Vec<PalletCommonFundingRequestParameters>): Discord.MessageEmbed {

  const fundingInfo = fundingData.map(funding => `${funding.amount.toString()} ➡️ ${funding.account.toString()}`).join('\n');
  return new Discord.MessageEmbed()
    .setTitle(`🏛 Funding Proposal '${generalInformation?.title.toString() || ''}' Created`)
    .setDescription(generalInformation?.description.toString() || 'N/A')
    .addFields([
      { name: 'Link', value: proposalUrl(proposalId?.toString() || ''), inline: true },
      { name: 'Author', value: generalInformation?.memberId.toString() || 'N/A', inline: true },
      { name: 'Funding', value: fundingInfo, inline: true}
    ])
    .setColor(joystreamBlue)
    .setTimestamp();
}

export function getWgBudgetProposalCreatedEmbed(
  proposalId: ProposalId | undefined,
  generalInformation: PalletProposalsCodexGeneralProposalParams | undefined,
  budgetData: ITuple<[Balance, PalletCommonWorkingGroup, PalletCommonBalanceKind]>): Discord.MessageEmbed {

  return new Discord.MessageEmbed()
    .setTitle(`${budgetData[2].isNegative ? 'DECREASE' : 'Update'} ${budgetData[1].toString()} budget by ${budgetData[0].toString()} tJOY`)
    .addFields([
      { name: 'Link', value: proposalUrl(proposalId?.toString() || ''), inline: true },
      { name: 'Author', value: generalInformation?.memberId.toString() || 'N/A', inline: true },
    ])
    .setColor(joystreamBlue)
    .setTimestamp();
}

function proposalUrl(id: string) {
  return `https://dao.joystream.org/#/proposals/preview/${id}`;
}