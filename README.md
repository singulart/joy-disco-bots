# Joystream Discord Bots

An ongoing initiative to unify the various Joystream Discord tools into one monorepo. This is planned as a home for 
1. Working Groups bot
2. Roles and Identities not
3. Forum bot
4. Atlas videos bot
5. Governance bot



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

https://i.stack.imgur.com/ICWVL.gif

Important gotcha: 
When server admin invites the bot via an invite link, the bot is assigned a server role typically. This role MUST be dragged above all roles that this bot is supposed to manage (grant,) otherwise "Missing Permission" will appear even for admin bot :)

Thanks to this [SO comment](https://stackoverflow.com/a/67799671).
