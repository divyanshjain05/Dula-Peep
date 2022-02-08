/** @format */

import { MessageType, Mimetype } from "@adiwajshing/baileys";
import MessageHandler from "../../Handlers/MessageHandler";
import BaseCommand from "../../lib/BaseCommand";
import WAClient from "../../lib/WAClient";
import { IParsedArgs, ISimplifiedMessage } from "../../typings";

export default class Command extends BaseCommand {
	constructor(client: WAClient, handler: MessageHandler) {
		super(client, handler, {
			command: "broadcast",
			description:
				"Will make a broadcast for groups where the bot is in. Can be used to make announcements.",
			aliases: ["bcast", "announcement", "bc"],
			category: "dev",
			dm: true,
			usage: `${client.config.prefix}bc`,
			modsOnly: true,
			baseXp: 0,
		});
	}

	run = async (
		M: ISimplifiedMessage,
		{ joined }: IParsedArgs
	): Promise<void> => {
		if (!joined)
			return void (await M.reply(`Please provide the Broadcast Message.`));
		const term = joined.trim();
		const gifs = [
			"https://c.tenor.com/QTty8k0XYIwAAAPo/al-alzolanskii.mp4",
			"https://c.tenor.com/FaTqQp3C2DkAAAPo/dua-dance.mp4",
			"https://c.tenor.com/stnFodcfqe4AAAPo/dua-lipa-coolstalgia.mp4",
			"https://c.tenor.com/3DKBpcf8gS4AAAPo/dua-lipa-glitterdua.mp4",
			"https://c.tenor.com/xjmfJFNRROkAAAPo/dua-lipa-dua-lipa-red-carpet.mp4",
			"https://c.tenor.com/egn09aWVw70AAAPo/brokengjh-solarnostalgia.mp4",
			"https://c.tenor.com/HX0p7ko2e1sAAAPo/dua-lipa.mp4",
			"https://c.tenor.com/20ZYB_t7FgsAAAPo/dua-lipa-coolstalgia.mp4",
			"https://c.tenor.com/2AE1uOZXrHwAAAPo/dua-lipa-cowgirl.mp4",
			"https://c.tenor.com/6x6d6UKMaRAAAAPo/dua-lipa.mp4",
		];
		const selected = gifs[Math.floor(Math.random() * gifs.length)];
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const chats: any = this.client.chats
			.all()
			.filter((v) => !v.read_only && !v.archive)
			.map((v) => v.jid)
			.map((jids) => (jids.includes("g.us") ? jids : null))
			.filter((v) => v);
		for (let i = 0; i < chats.length; i++) {
			const text = `*⚡「DULAPEEP BROADCAST」⚡*\n\n${term}\n\n Regards ~ *${M.sender.username}*`;
			this.client.sendMessage(chats[i], { url: selected }, MessageType.video, {
				mimetype: Mimetype.gif,
				caption: `${text}`,
				contextInfo: {
					mentionedJid: M.groupMetadata?.participants.map((user) => user.jid),
				},
			});
		}
		await M.reply(`✅ Broadcast Message sent to *${chats.length} groups*.`);
	};
}
