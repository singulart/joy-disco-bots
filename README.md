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