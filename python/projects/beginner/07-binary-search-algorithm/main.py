# a function that takes a list and target parameter
# muliple variables: middle,start,end, steps
# recursion or while loop
# increase the steps each time a split is done
# condition to track target value or position

def  binary_search(list,target):
    middle = 0
    start = 0
    end = len(list)
    steps = 0
    while start <=end:
        print("Step",steps,":", str(list[start:end+1]))

        steps = steps+1
        middle = (start+end) // 2

        if target == list[middle]:
            return middle
        if target < list[middle]:
            end = middle - 1
        else:
            start = middle + 1

    return -1        
    
my_list=[1,2,3,4,5,6,7,8,9]    
target=3
binary_search(my_list,target)

# linear search: this is time complexity O(n) as it needs to loop on each element so binary search is better
for i in my_list:
    if i == target:
        print("Target found at position",i-1)