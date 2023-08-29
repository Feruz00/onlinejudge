#!/bin/sh

# $1 - dil
# $2 - error.txt
# $3 - output.txt
# $4 - timelimit

# ls
# echo `cat test.txt`
# echo ls

CE=0
RTE=0

if [ $# -eq 4 ]
then {
    if [ $1 = "cpp" ] 
    then {
        {
            cat test.txt | ../usr/bin/time -f "%e %M" -o $2 timeout $4s ./solution &> $3
        } || {
            RTE=1
        } } 
    fi
}
else {
    # ls
    if [ $1 = "cpp" ] 
    then {
        g++ -Wall -lm -static -DEVAL -o solution -O2 solution.cpp &> $2
    } || {
        CE=1
    } 
    fi 
    # echo `cat error.txt`
}
fi



if [[ $CE -eq 1 ]]
then
    echo "COMPILATION ERROR" >> $2
fi

if [[ $RTE -eq 1 ]]
then
    echo "RUNTIME ERROR" >> $2
fi

# if [ $1 = "cpp" ] 
#     then {
#         # g++ -o solution solution.cpp
#         g++ -Wall -lm -static -DEVAL -o solution -O2 solution.cpp -std=c++11 &> $2  &&  { {
#             cat test.txt | ../usr/bin/time -f "%e %M" -o $2 timeout $4s ./solution &> $3
#         } || {
#             RTE=1
#         } }
#     } || {
#         CE=1
#     } 
#     fi