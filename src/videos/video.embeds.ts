import { joystreamBlue, licenses } from 'config';
import { GetVideoByIdQuery } from 'src/qntypes-atlas';
import Discord, { EmbedAuthorData } from 'discord.js';
import { humanFileSize } from './sizeformat';
import moment from 'moment';
import 'moment-duration-format';

export function getVideoEmbed(video: GetVideoByIdQuery, cdnUrl: string): Discord.MessageEmbed {
  const vid = video.videoByUniqueInput;
  const licenseKey = vid?.license?.code || ' ';
  const exampleEmbed = new Discord.MessageEmbed()
    .setColor(joystreamBlue)
    .setTitle(vid?.title || ' ')
    .setURL(`https://play.joystream.org/video/${vid?.id}`)
    .setDescription(vid?.description?.substring(0, 200) || ' ') // cut off lengthy descriptions 
    .addFields([
      { name: 'ID', value: vid?.id || ' ', inline: true },
      { name: 'Category', value: vid?.category?.name || ' ', inline: true },
      { name: 'Duration', value: durationFormat(vid?.duration || 0), inline: true },
      { name: 'Language', value: vid?.language?.iso || ' ', inline: true },
      { name: 'Size', value: humanFileSize(vid?.media?.size), inline: true },
      { name: 'License', value: licenses[licenseKey] || ' ', inline: true },
    ]).setTimestamp();
  const uploaderTitle = `${vid?.channel.title} (${vid?.channel.ownerMember?.controllerAccount})`
  const avatarObj = vid?.channel.avatarPhoto?.id;
  const author = {
    name: uploaderTitle, 
    iconURL: avatarObj ? `${cdnUrl}/${avatarObj}` : null, 
    url: `https://play.joystream.org/channel/${vid?.channel?.id}`
  } as EmbedAuthorData;
  exampleEmbed.setAuthor(author);
  console.log(`${cdnUrl}/${vid?.thumbnailPhoto?.id}`);
  exampleEmbed.setImage(`${cdnUrl}/${vid?.thumbnailPhoto?.id}`);
  return exampleEmbed;
}

function durationFormat(duration: number) {
  if (duration < 60) {
    return `${duration}s.`
  } else {
     return moment.duration(duration, 'seconds').format('hh:mm:ss')
  }
}
