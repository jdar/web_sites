
#start redis
print("make sure core redis running")
j.clients.redis.core_check()

#start 
cmd=""""
export LC_ALL=de_DE.utf-8
export LANG=de_DE.utf-8
export FLASK_DEBUG=1
export APP_SETTINGS=project.server.config.DevelopmentConfig
"""
j.tools.tmux.execute(cmd, session='main', window='web',pane='main', session_reset=False, window_reset=True)

print("webserver running on http://localhost:5555/")

