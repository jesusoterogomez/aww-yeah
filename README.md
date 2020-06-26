# The new and improved _Aww Yeah_ tool

## What is "aww yeah"?

1. A terrible name for a tool
2. A command line tool that helps you set up, run, stop, restart, etc. your Penneo local stack of services.

## What can I do with it?

At the moment, the functionality is certainly limited, but that doesn't mean it's not nice to use.

So far, you can perform the following commands:

| Command               | Description                                                                                                                |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `aww help`              | Displays the documentation                                                                                                 |
| `aww init`              | Starts the wizard to set up this tool. (Must be done before running any task)                                              |
| `aww run [service]`     | Run the docker container for a service. |
| `aww stop [service]`    | Stops the docker container of a service                                                                                    |
| `aww restart [service]` | Restart the docker container of a service                                                                                  |
| `aww login [service]`   | Log in to the docker container of a service. The service must be already running                                           |
| `aww clone [service]`   | Clone the repository of the service                                                                                        |


#### 🤔 Pro Tip:

You don't need to remember any of these commands. You can just type `aww` and follow the wizard which will let you choose the service and command to run.

#### 🧠 Pro-er Tip:

There are some commands, like `run`, that can be run in parallel between multiple services, if you type `aww run` and make a selection, this selection will be remembered next time you use the same command. This means that if you always run the same stack every day, you don't need to manually select the same services every time.

#### 🚀 Pro-est Tip:

You can still run the commands directly.

_Example:_
```
- You can run `aww`, and follow the wizard to run the frontend
- You can run `aww run`, and then pick frontend from the list for the same result.
- You can type `aww run fe-webapp` and the command will be run directly without any prompts.
```

## Why even make a new version?

The first version of _aww yeah_ assummed you knew the commands or made you very reliant on the help documentation, which was usually difficult to keep in sync with the available commands. This was problematic especially for new team members.

The new version relies heavily on the use of wizards and command prompts, which will make it easy to use for non experienced users.

_See this short example:_

<img width="590" src="https://user-images.githubusercontent.com/5709736/85855353-6d114280-b7b6-11ea-9b02-987741798eee.gif"/>

## Ok, I'm sold, how do I use it?

A nice installer will come at a later point, but for now, you'll have to clone this repository and run a couple of commands.

### Installation Instructions:

```sh
# Clone the repository
$ git clone --branch next git@github.com:Penneo/aww-yeah.git

# Run the installation script
# This will install the `aww` command and enable it to be used from any directory
$ ./scripts/install.sh

# Initialize the tool by following the 🧙‍♂️Wizard's instructions
$ aww init
```

## Standing on the shoulders of giants

(Well, if your definition of giant is a pakistani guy that's about 1.77cm)

This project is based on the work of Ahmad Nazir and his first version of Aww Yeah.
