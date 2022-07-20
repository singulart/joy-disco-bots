# Joystream Discord Bots

An ongoing initiative to unify the various Joystream Discord tools into one monorepo. This is planned as a home for 
1. [Working Groups bot](./src/wg/README.md)
2. [Roles and Identities bot](./src/identity/)
3. [Forum bot](./src/forum/)
4. [Atlas videos bot](./src/videos/)
5. [Governance bot](./src/governance)
6. [Storage Providers Health Check](./src/storage-providers/)

# Running locally

To run the bot locally you need to have your test Discord server ID. Right-click on your Discord server and chose "Copy ID". The only infrastructure piece you'd need locally is the Postgres database. By default, the name of the database bot looks for is `joy_dao`. 

# Heroku deployment
<p>
  <a href="https://heroku.com/deploy">
    <img src="https://www.herokucdn.com/deploy/button.svg" alt="Deploy">
  </a>
</p>

1. Set `TOKEN` config var
2. Set `DISCORD_SERVER` config var
3. Create `NODE_OPTIONS=--max_old_space_size=2560` config var, otherwise heap errors are possible.

# Discord permission

Discord permissions system is complex and it may be a frustrating experience to debug and troubleshoot `Missing permission` errors. The below is the list of things that are very non-intuitive and will save you many hours of googling ;)

https://i.stack.imgur.com/ICWVL.gif

Important gotchas: 
1. When server admin invites the bot via an invite link, the bot is automatically assigned a default server role (typically the name of this role is the same as the bot's name.) This role MUST be dragged above all roles that this bot is supposed to manage (grant), otherwise "Missing Permission" will appear even for admin bot :)

Thanks to this [SO comment](https://stackoverflow.com/a/67799671).

2. Joystream official server has `participant` role. This is the basic role allowing users to see channels and interact with them. The bot user must be assigned this role by the admin, too. 