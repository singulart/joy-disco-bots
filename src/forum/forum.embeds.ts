import Discord from 'discord.js';
import { EventRecord } from '@polkadot/types/interfaces';
import { joystreamBlue } from '../../config'
import { ForumThreadByIdQuery, PostByIdQuery } from 'src/qntypes';


export const getNewThreadEmbed = (thread: ForumThreadByIdQuery, blockNumber: number, event: EventRecord): Discord.MessageEmbed => {
  const f = thread.forumThreadByUniqueInput;
  return addCommonProperties(new Discord.MessageEmbed()
    .setTitle(`New thread [${f?.title}] by user [${f?.author.handle}] created in [${f?.category.title}]`)
    .setDescription(threadUrl(f?.id))
    , blockNumber, event);
}

export const getNewPostEmbed = (post: PostByIdQuery, blockNumber: number, event: EventRecord): Discord.MessageEmbed => {
  const p = post.forumPostByUniqueInput;
  return addCommonProperties(new Discord.MessageEmbed()
    .setTitle(`New post by [${p?.author.handle}] created in [${p?.thread.title}]`)
    .setDescription(postUrl(p?.thread.id, p?.id))
    .addFields(
      { name: 'Category', value: p?.thread.category.title || ' ', inline: true }
    )
    , blockNumber, event);
}

const addCommonProperties = (embed: Discord.MessageEmbed, blockNumber: number, event: EventRecord) => {
  return embed
    .setColor(joystreamBlue)
    .setTimestamp();
}

const threadUrl = (threadId: string | undefined) => `https://dao.joystream.org/#/forum/thread/${threadId}`

const postUrl = (threadId: string | undefined, postId: string | undefined) => `${threadUrl(threadId)}?post=${postId}`