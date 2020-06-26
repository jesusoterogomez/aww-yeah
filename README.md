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
| `aww run [service]`     | Run the docker container for a service. If you don't specify a service, you are able to pick multiple services from a list |
| `aww stop [service]`    | Stops the docker container of a service                                                                                    | ‏‏‎ ‎ |
| `aww restart [service]` | Restart the docker container of a service                                                                                  | ‏‏‎ ‎ |
| `aww login [service]`   | Log in to the docker container of a service. The service must be already running                                           |
| `aww clone [service]`   | Clone the repository of the service                                                                                        |

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
