// Step-up lesson added to every chapter that had only two, so all 13 chapters have 3+ lessons.
const A=(id,...a)=>COURSE[id].push(L(...a));
A('intro','Edge cases and testing your algorithm',['The basic loop is easy; contests are won on <b>edge cases</b>: the smallest input (N = 1), repeated values, negative numbers, and the largest input.','<b>Problem:</b> find the second largest <i>distinct</i> value in 4 9 2 9 7. Keep two variables, the best and the runner-up. A new value beats the best: the old best becomes runner-up. A value equal to the best is ignored (it is not distinct); a smaller value may become the runner-up.','Trace: 4 → best 4; 9 → runner-up 4, best 9; 2 no change; 9 equal so ignored; 7 → runner-up 7. Answer 7. Always test by hand on a tiny tricky input before submitting.'],`#include <bits/stdc++.h>
using namespace std;
int main(){
  vector<int> a = {4,9,2,9,7};
  long long b1 = LLONG_MIN, b2 = LLONG_MIN;
  for(int x : a){
    if(x > b1){ b2 = b1; b1 = x; }
    else if(x < b1 && x > b2) b2 = x;
  }
  cout<<b2<<"\\n";
}`,'(none)','7','a problem with tricky edge cases (duplicates, N = 1, negatives) that punishes a naive solution','edge cases and careful variable updates');
A('eff','Space complexity and trading memory for speed',['<b>Space complexity</b> is the extra memory an algorithm uses. Typical limits are 256 MB: an <code>int</code> takes 4 bytes, so an array of 10^7 ints is 40 MB, fine, but a 10^5 by 10^5 table (10^10 cells) is impossible.','Often you can <b>spend memory to save time</b>. To count distinct values when every value is at most 100, a frequency array of size 101 beats comparing every pair (O(N^2)) and runs in O(N).','Example: 3 1 3 2 1 3 gives freq[1]=2, freq[2]=1, freq[3]=3, so 3 distinct values. Always check both limits: time from the 10^8 rule, memory from array sizes.'],`#include <bits/stdc++.h>
using namespace std;
int main(){
  vector<int> a = {3,1,3,2,1,3};
  vector<int> freq(101, 0);
  for(int x : a) freq[x]++;
  int distinct = 0;
  for(int v=0; v<=100; v++) if(freq[v] > 0) distinct++;
  cout<<distinct<<"\\n";
}`,'(none)','3','a problem where small value ranges let a counting/frequency array beat a nested loop','time vs memory trade-off, frequency arrays');
A('sort','Sorting plus two pointers',['Sorting is often a <i>preparation</i> step. Once data is sorted, a <b>two-pointer</b> scan from both ends can do in O(N) what pairs-checking does in O(N^2).','<b>Problem:</b> in a sorted list, find two numbers with sum 10. Put one pointer l at the start and one pointer r at the end. If the sum is too big, move r left; if too small, move l right; if equal, you are done.','Sorted 1 3 4 6 8 11: 1+11 = 12 (too big, r moves); 1+8 = 9 (too small, l moves); 3+8 = 11 (r moves); 3+6 = 9 (l moves); 4+6 = 10 found. Total cost O(N log N) for the sort plus O(N) for the scan.'],`#include <bits/stdc++.h>
using namespace std;
int main(){
  vector<int> a = {1,3,4,6,8,11}; int target = 10;
  int l = 0, r = a.size()-1;
  while(l < r){
    int s = a[l] + a[r];
    if(s == target){ cout<<a[l]<<" "<<a[r]<<"\\n"; break; }
    if(s < target) l++; else r--;
  }
}`,'(none)','4 6','a pair-sum or closest-pair problem solved by sorting then moving two pointers','sorting then two pointers');
A('greedy','Greedy by sorting on the right key',['Many greedy problems are really "sort by the right key, then scan". The skill is choosing the key by asking: which item hurts everyone else the least if done first?','<b>Problem:</b> customers need service times 3, 1, 2 and are served one at a time. Minimise the total waiting time. Each customer delays everyone after them, so serve the <b>shortest first</b>. (Exchange argument: if a long job precedes a short one, swapping them lowers the total.)','Order 1, 2, 3 gives waits 0, 1, 3, total 4. Order 3, 1, 2 gives 0, 3, 4, total 7. In code, track how long the queue has been running and add it for each customer.'],`#include <bits/stdc++.h>
using namespace std;
int main(){
  vector<int> t = {3,1,2};
  sort(t.begin(), t.end());
  long long wait = 0, total = 0;
  for(int x : t){ total += wait; wait += x; }
  cout<<total<<"\\n";
}`,'(none)','4','a scheduling problem where sorting by duration, deadline or ratio gives the minimum total','choosing the sort key with an exchange argument');
A('sp','Recovering the actual path',['Distances answer "how far"; most problems also ask "<b>which route</b>". Store a <b>parent</b> array: whenever you improve dist[v] through u, set parent[v] = u.','To print the path, start at the target and repeatedly jump to its parent until you reach the start, then <b>reverse</b> the list. If dist[target] is still infinite, there is no path; say so.','Using the graph 0→1 (4), 0→2 (1), 2→1 (2), 1→3 (1): vertex 1 first gets parent 0, then improves via 2, so parent[1] = 2; vertex 3 has parent 1. Walking back from 3 gives 3, 1, 2, 0, reversed 0 2 1 3. The same idea works with Dijkstra.'],`#include <bits/stdc++.h>
using namespace std;
int main(){
  int n = 4; const int INF = 1e9;
  int e[4][3] = {{0,1,4},{0,2,1},{2,1,2},{1,3,1}};
  vector<int> d(n,INF), par(n,-1); d[0] = 0;
  for(int r=0;r<n-1;r++)
    for(auto &x : e) if(d[x[0]]<INF && d[x[0]]+x[2] < d[x[1]]){ d[x[1]] = d[x[0]]+x[2]; par[x[1]] = x[0]; }
  vector<int> path;
  for(int v=3; v!=-1; v=par[v]) path.push_back(v);
  reverse(path.begin(), path.end());
  cout<<"Path:";
  for(int v : path) cout<<" "<<v;
  cout<<"\\n";
}`,'(none)','Path: 0 2 1 3','a shortest-route problem that asks you to print the route itself, not only its length','parent arrays and path reconstruction');
A('heap','Keeping the K largest with a min-heap',['Sometimes you only care about the <b>top K</b> of a huge stream. Sorting everything costs O(N log N); a heap of size K costs only O(N log K) and uses little memory.','Trick: use a <b>min-heap</b> holding the best K so far. Push every new value; if the heap grows beyond K, pop the smallest. What remains are the K largest, and the heap top is exactly the K-th largest.','For 5 1 9 3 7 8 and K = 3: after processing, the heap holds 7, 8, 9 and its top is 7, the 3rd largest. It looks backwards (min-heap for largest) but the smallest of the best K is the one to discard.'],`#include <bits/stdc++.h>
using namespace std;
int main(){
  vector<int> a = {5,1,9,3,7,8}; int K = 3;
  priority_queue<int, vector<int>, greater<int>> pq;
  for(int x : a){ pq.push(x); if((int)pq.size() > K) pq.pop(); }
  cout<<pq.top()<<"\\n";
}`,'(none)','7','a K-th largest or top-K problem over a large input where a heap of size K is enough','heap of fixed size K');
A('perm','Pruning permutations with a rule',['Brute force over all N! orderings is too slow beyond N ≈ 10, but many problems only count orderings that satisfy a <b>rule</b>. Generate and test, or stop early (prune) as soon as a partial ordering breaks the rule.','<b>Problem:</b> count permutations of 1, 2, 3 where no number sits in its own position (position i must not hold value i). These are called derangements.','Of the six permutations only 2 3 1 and 3 1 2 qualify, so the answer is 2. With next_permutation, test every permutation; with backtracking, skip a branch the moment p[i] = i appears.'],`#include <bits/stdc++.h>
using namespace std;
int main(){
  vector<int> p = {1,2,3}; int count = 0;
  do {
    bool ok = true;
    for(int i=0;i<3;i++) if(p[i] == i+1) ok = false;
    if(ok) count++;
  } while(next_permutation(p.begin(), p.end()));
  cout<<count<<"\\n";
}`,'(none)','2','a small-N problem that counts or finds the best arrangement satisfying constraints, using generate-and-test or pruning','permutations with constraints and pruning');
A('dag','Longest path in a DAG',['Finding a <i>longest</i> path is very hard in general graphs, but in a <b>DAG</b> it is easy, because the topological order lets you finalise vertices left to right. It models "the longest chain of dependent tasks".','State: best[v] = length of the longest path ending at v (start at 0). Processing vertices in topological order, for each edge u→v do best[v] = max(best[v], best[u]+1).','Edges 0→1, 0→2, 1→2, 2→3: best[1] = 1, best[2] = max(1, 2) = 2, best[3] = 3. The longest path is 0, 1, 2, 3 with 3 edges. Replace +1 by the edge weight for weighted graphs.'],`#include <bits/stdc++.h>
using namespace std;
int main(){
  vector<vector<int>> g = {{1,2},{2},{3},{}};
  vector<int> best(4, 0);
  for(int u=0;u<4;u++)             // 0..3 is a topological order
    for(int v : g[u]) best[v] = max(best[v], best[u]+1);
  cout<<*max_element(best.begin(), best.end())<<"\\n";
}`,'(none)','3','a longest-chain or critical-path problem on a DAG of tasks, solved by DP in topological order','longest path DP on a DAG');
A('pre','Two-dimensional prefix sums',['A grid has rows and columns, so a rectangle sum is the next step up. Define P[i][j] as the sum of the top-left block with i rows and j columns.','Build with inclusion-exclusion: P[i+1][j+1] = a[i][j] + P[i][j+1] + P[i+1][j] - P[i][j] (the overlap is counted twice, so subtract it once). A rectangle from (r1,c1) to (r2,c2) is P[r2+1][c2+1] - P[r1][c2+1] - P[r2+1][c1] + P[r1][c1].','For the grid 1 2 3 / 4 5 6 / 7 8 9, the rectangle on rows 1..2 and columns 1..2 holds 5, 6, 8, 9 and sums to 28. Each query is O(1) after O(RC) setup.'],`#include <bits/stdc++.h>
using namespace std;
int main(){
  int a[3][3] = {{1,2,3},{4,5,6},{7,8,9}};
  long long P[4][4] = {};
  for(int i=0;i<3;i++) for(int j=0;j<3;j++)
    P[i+1][j+1] = a[i][j] + P[i][j+1] + P[i+1][j] - P[i][j];
  int r1=1, c1=1, r2=2, c2=2;
  cout<<P[r2+1][c2+1]-P[r1][c2+1]-P[r2+1][c1]+P[r1][c1]<<"\\n";
}`,'(none)','28','a grid problem with many rectangle-sum queries solved by 2D prefix sums','2D prefix sums with inclusion-exclusion');
A('sw','Sliding window with a frequency count',['Windows can track more than a sum: keep a small <b>frequency table</b> of what is inside, and shrink from the left whenever a rule is broken.','<b>Problem:</b> the longest part of the string "eceba" that uses at most 2 distinct letters. Extend the right end, counting letters in a map; while the map holds more than 2 letters, drop the left letter (erase it when its count hits 0).','Trace: "e", "ec", "ece" (3 letters long, 2 distinct), then adding b gives 3 distinct, so we drop e and c until "eb" remains; adding a leaves "ba". The longest valid window was 3. Total work stays O(N) because each index enters and leaves once.'],`#include <bits/stdc++.h>
using namespace std;
int main(){
  string s = "eceba"; map<char,int> cnt;
  int l = 0, best = 0;
  for(int r=0;r<(int)s.size();r++){
    cnt[s[r]]++;
    while(cnt.size() > 2){
      if(--cnt[s[l]] == 0) cnt.erase(s[l]);
      l++;
    }
    best = max(best, r-l+1);
  }
  cout<<best<<"\\n";
}`,'(none)','3','a longest-substring problem with a limit on distinct values or repeated characters','window with a frequency map');
