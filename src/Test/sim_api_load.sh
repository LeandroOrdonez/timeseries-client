seq 1 32 | xargs -n1 -P4  sh -c 'START=$(date +%s.%N); \
ts-node src/Test/summariesDataTest.ts; \
END=$(date +%s.%N); \
DIFF=$(echo "$END - $START" | bc); \
echo $DIFF >> parallel_exec_time_p4.log'