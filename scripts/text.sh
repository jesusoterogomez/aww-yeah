heading1=$(tput bold)$(tput setaf 4)
heading2=$(tput setaf 4)
heading3=$(tput bold)
notice=$(tput setaf 3)
n=$(tput sgr0)

function h1()
{
    echo
    echo "$heading1 [ $@ ]$n"
    echo
}

function h2()
{
    echo
    echo "$heading2 $1$n"
    echo
}

function h3()
{
    echo
    echo "$heading3 $1$n"
    echo
}

function notice()
{
    echo
    echo "$notice !!! $1 !!! $n"
    echo
}
