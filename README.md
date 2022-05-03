# Joystream Discord Bots

An ongoing initiative to unify the various Joystream Discord tools into one monorepo. This is planned as a home for 
1. Working Groups bot
2. Forum bot
3. Atlas videos bot
4. Membership bot

# Heroku deployment

1. Set `TOKEN` config var
2. Create `NODE_OPTIONS=--max_old_space_size=2560` config var, otherwise heap errors are possible.