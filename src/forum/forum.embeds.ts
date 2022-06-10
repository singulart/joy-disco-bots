import Discord from 'discord.js';
import { EventRecord } from '@polkadot/types/interfaces';
import { joystreamBlue } from '../../config'
import { ForumThreadByIdQuery, PostByIdQuery } from 'src/qntypes';


export const getNewThreadEmbed = (thread: ForumThreadByIdQuery, blockNumber: number, event: EventRecord): Discord.MessageEmbed => {
  const f = thread.forumThreadByUniqueInput;
  return addCommonProperties(new Discord.MessageEmbed()
    .setTitle(`New thread [${f?.title}] by user [${f?.author.handle}] created in [${f?.category.title}]`)
    .addFields(
      { name: 'Thread ID', value: f?.id || ' ', inline: true },
      { name: 'Category ID', value: f?.category.id || ' ', inline: true },
    )
    , blockNumber, event);
}

export const getNewPostEmbed = (post: PostByIdQuery, blockNumber: number, event: EventRecord): Discord.MessageEmbed => {
  const p = post.forumPostByUniqueInput;
  return addCommonProperties(new Discord.MessageEmbed()
    .setTitle(`New post by [${p?.author.handle}] created in [${p?.thread.title}]`)
    .addFields(
      { name: 'Category', value: p?.thread.category.title || ' ', inline: true },
      { name: 'Post ID', value: p?.id || ' ', inline: true },
    )
    , blockNumber, event);
}

const addCommonProperties = (embed: Discord.MessageEmbed, blockNumber: number, event: EventRecord) => {
  return embed.addFields(
    { name: 'Block', value: blockNumber + "", inline: true },
    { name: 'Tx', value: event.hash.toString(), inline: true },
  )
    .setColor(joystreamBlue)
    .setTimestamp();
}  