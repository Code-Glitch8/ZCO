// Remaining 9 chapters (basics first, then stepping up) + a third passage for older 2-passage lessons.
window.L=(t,p,code,inp,out,qk,qf)=>({t,e:p.map(x=>`<p>${x}</p>`).join(''),code,inp,out,qk,qf});
COURSE.bs[0].e+='<p><b>Step up:</b> linear search needs no preparation, so it is right for a tiny or unsorted list. The moment you must answer many queries, spend effort once (sorting) so every later query is cheap. Hold on to that "prepare once, answer fast" idea; it appears in every chapter.</p>';
COURSE.dp[1].e+='<p><b>Check your work:</b> before coding, test the recurrence by hand on a tiny input (n = 3 gives 3 ways: 1+1+1, 1+2, 2+1). If your table disagrees with a hand count, the state or base case is wrong. Doing this habitually is the fastest way to debug DP.</p>';
COURSE.dp[2].e+='<p><b>Why it works:</b> every choice for item i either uses it or not, and in both cases the remaining problem is the same kind of problem on fewer items. That is optimal substructure. If you forget the "skip" option, you wrongly force a pick.</p>';
COURSE.dp[3].e+='<p><b>Step up:</b> this O(N^2) version passes the early subtasks. For N up to 10^5 there is an O(N log N) method that keeps the smallest possible tail of each length and uses binary search, which links this lesson back to Binary Search.</p>';
Object.assign(COURSE,{
sort:[
L('Sorting basics and bubble sort',['<b>Sorting</b> means arranging items in order, e.g. 5 2 4 1 becomes 1 2 4 5. It matters because many hard problems become easy on sorted data: the smallest is first, duplicates sit together, and binary search becomes possible.','<b>Bubble sort</b> is the simplest method. Walk through the list comparing each pair of neighbours; if the left one is bigger, swap them. After one full walk the biggest item has "bubbled" to the end. Repeat for the remaining items.','Trace for 5 2 4 1. Walk 1: 2 4 1 5. Walk 2: 2 1 4 5. Walk 3: 1 2 4 5. For N items we do up to N-1 walks of up to N-1 comparisons, so bubble sort is O(N^2): fine for N = 1000, too slow for 10^5.'],`#include <bits/stdc++.h>
using namespace std;
int main(){
  vector<int> a = {5,2,4,1}; int n = a.size();
  for(int pass=0; pass<n-1; pass++)
    for(int i=0; i+1<n-pass; i++)
      if(a[i] > a[i+1]) swap(a[i], a[i+1]);
  for(int x : a) cout<<x<<" ";
  cout<<"\\n";
}`,'(none)','1 2 4 5','an easy problem asking the learner to sort a small array or find the k-th smallest by sorting','basic sorting and what order means'),
L('std::sort, custom order and merge sort',['In real contests you almost never write bubble sort. C++ gives <code>sort(a.begin(), a.end())</code>, which runs in O(N log N): about 17 million steps for N = 10^6.','To sort largest first, pass a comparator: <code>sort(a.begin(), a.end(), greater&lt;int&gt;())</code>. You can sort pairs too; by default a pair is compared by its first value, then its second. Sorting is often the hidden first step of a ZCO solution.','<b>Why N log N?</b> Merge sort splits the list in half, sorts each half, then merges two sorted halves in one pass. The list can be halved only log N times, and each level costs N, giving N log N. Stable sorting keeps equal items in their original order.'],`#include <bits/stdc++.h>
using namespace std;
int main(){
  vector<int> a = {5,2,4,1,9};
  sort(a.begin(), a.end(), greater<int>());
  for(int x : a) cout<<x<<" ";
  cout<<"\\n";
}`,'(none)','9 5 4 2 1','a problem where sorting (possibly with a custom comparator) is the key step before a simple scan','std::sort, comparators, sorting pairs')],
graph:[
L('What is a graph? Adjacency lists',['A <b>graph</b> is dots (<b>vertices</b>) joined by lines (<b>edges</b>). Cities and roads, people and friendships, web pages and links are all graphs. In an <b>undirected</b> graph an edge works both ways; in a <b>directed</b> graph it has a direction.','To store a graph, give every vertex a list of its neighbours: an <b>adjacency list</b>, written <code>vector&lt;vector&lt;int&gt;&gt; g(n)</code>. For an undirected edge a-b, add b to g[a] and a to g[b]. This uses space proportional to V+E.','Our example has 4 vertices and edges 0-1, 0-2, 1-3, 2-3 (a square). Vertex 0 has neighbours 1 and 2, vertex 3 has neighbours 1 and 2. Vertices are numbered from 0 in code; many contest problems number from 1, so read carefully.'],`#include <bits/stdc++.h>
using namespace std;
int main(){
  int n = 4; vector<vector<int>> g(n);
  int e[4][2] = {{0,1},{0,2},{1,3},{2,3}};
  for(auto &p : e){ g[p[0]].push_back(p[1]); g[p[1]].push_back(p[0]); }
  for(int u=0;u<n;u++){
    cout<<u<<":";
    for(int v : g[u]) cout<<" "<<v;
    cout<<"\\n";
  }
}`,'(none)','0: 1 2\n1: 0 3\n2: 0 3\n3: 1 2','an easy problem that reads a graph and prints degrees or neighbour lists','building adjacency lists from edge input'),
L('BFS: shortest path by number of edges',['Now we <i>use</i> the graph. <b>Breadth-First Search (BFS)</b> explores in rings: first the start, then everything 1 edge away, then 2 edges away, and so on. Think of a ripple spreading on a pond.','Implementation: a <b>queue</b> (first in, first out). Put the start in with distance 0. Repeatedly take the front vertex and, for each unvisited neighbour, set its distance to +1 and push it. Mark vertices when pushed so none is added twice.','On the square graph from the start 0: distance 0 is vertex 0; vertices 1 and 2 get distance 1; vertex 3 is discovered from 1 with distance 2. BFS costs O(V+E) and gives shortest paths only when all edges have the same length.'],`#include <bits/stdc++.h>
using namespace std;
int main(){
  int n = 4; vector<vector<int>> g = {{1,2},{0,3},{0,3},{1,2}};
  vector<int> dist(n,-1); queue<int> q;
  dist[0] = 0; q.push(0);
  while(!q.empty()){
    int u = q.front(); q.pop();
    for(int v : g[u]) if(dist[v]==-1){ dist[v] = dist[u]+1; q.push(v); }
  }
  for(int d : dist) cout<<d<<" ";
  cout<<"\\n";
}`,'(none)','0 1 1 2','a shortest-path-in-steps problem on a grid or unweighted graph solved with BFS','BFS with distance array'),
L('DFS and connected components',['<b>Depth-First Search (DFS)</b> goes as deep as possible along one path, then backs up. It is naturally written as recursion: visit a vertex, then call DFS on each unvisited neighbour.','A <b>connected component</b> is a group of vertices that can reach each other. To count them, loop over all vertices; whenever you meet an unvisited one, start a DFS (it marks its whole component) and add 1 to the count.','Example: 6 vertices, edges 0-1, 1-2, 3-4; vertex 5 is alone. The components are {0,1,2}, {3,4}, {5}, so the answer is 3. DFS also underlies flood-fill, cycle detection and topological sorting. Very deep recursion can overflow the stack, so know when to prefer BFS.'],`#include <bits/stdc++.h>
using namespace std;
vector<vector<int>> g(6); vector<int> seen(6);
void dfs(int u){ seen[u]=1; for(int v : g[u]) if(!seen[v]) dfs(v); }
int main(){
  int e[3][2] = {{0,1},{1,2},{3,4}};
  for(auto &p : e){ g[p[0]].push_back(p[1]); g[p[1]].push_back(p[0]); }
  int comp = 0;
  for(int u=0;u<6;u++) if(!seen[u]){ dfs(u); comp++; }
  cout<<"Components = "<<comp<<"\\n";
}`,'(none)','Components = 3','a grid or graph problem asking for the number or size of connected regions','DFS flood fill, counting components')],
greedy:[
L('The greedy idea: best choice now',['A <b>greedy</b> algorithm builds an answer step by step, always taking the option that looks best right now, and never changes its mind. It is simple and fast.','Everyday example: paying 93 rupees with notes 50, 20, 10, 5, 2, 1 using the fewest notes. Take the biggest note that fits each time: 50, then 20, 20, then 2, then 1. That is 5 notes, and it is the best possible.','<b>Warning:</b> greedy is not always right. With coins {1,3,4} and amount 6, greedy takes 4+1+1 (three coins) but 3+3 uses two. Greedy is only valid when you can argue why; the next lesson shows how.'],`#include <bits/stdc++.h>
using namespace std;
int main(){
  int notes[6] = {50,20,10,5,2,1}, A = 93, cnt = 0;
  for(int d : notes){ cnt += A/d; A %= d; }
  cout<<cnt<<"\\n";
}`,'(none)','5','an easy problem where taking the largest/smallest available option each step gives the optimum','simple greedy choices and checking them on small cases'),
L('Interval scheduling and the exchange argument',['<b>Problem:</b> many activities each have a start and finish time; you can attend one at a time. Choose the maximum number. Which rule works: earliest start, shortest length, or earliest finish? Only <b>earliest finish</b> is always correct.','<b>Why (exchange argument):</b> take any best schedule. Its first activity finishes no earlier than the greedy pick, so swap it for the greedy pick; nothing overlaps more than before and the count stays the same. Repeat, and greedy equals an optimal schedule.','Intervals (1,4),(3,5),(0,6),(5,7),(8,9),(5,9). Sorted by finish: (1,4), (3,5), (0,6), (5,7), (8,9), (5,9). Take (1,4); skip (3,5) and (0,6); take (5,7); take (8,9); skip (5,9). Answer 3. The hard part in ZCO is usually deciding what to sort by.'],`#include <bits/stdc++.h>
using namespace std;
int main(){
  vector<pair<int,int>> iv = {{1,4},{3,5},{0,6},{5,7},{8,9},{5,9}};
  sort(iv.begin(), iv.end(), [](auto &a, auto &b){ return a.second < b.second; });
  int cnt = 0, last = -1;
  for(auto &p : iv) if(p.first >= last){ cnt++; last = p.second; }
  cout<<cnt<<"\\n";
}`,'(none)','3','a scheduling/intervals problem whose solution is a sort followed by one greedy scan','exchange argument, choosing what to sort by')],
sp:[
L('Weighted graphs and relaxation',['In a <b>weighted</b> graph each edge has a cost (distance, time, price). The cost of a path is the sum of its edge weights, and the <b>shortest path</b> is the cheapest one. BFS is no longer enough, because fewer edges does not mean less cost.','Keep dist[v], the best known cost to reach v. <b>Relaxing</b> an edge u→v of weight w means: if dist[u]+w &lt; dist[v], improve dist[v]. Repeating relaxation over all edges N-1 times is the <b>Bellman-Ford</b> algorithm, and it also handles negative weights.','Directed edges: 0→1 (4), 0→2 (1), 2→1 (2), 1→3 (1). Going 0→1 directly costs 4, but 0→2→1 costs 3, so relaxation improves vertex 1 to 3, and vertex 3 becomes 4. Final distances: 0, 3, 1, 4.'],`#include <bits/stdc++.h>
using namespace std;
int main(){
  int n = 4; const int INF = 1e9;
  int e[4][3] = {{0,1,4},{0,2,1},{2,1,2},{1,3,1}};
  vector<int> d(n,INF); d[0] = 0;
  for(int r=0;r<n-1;r++)
    for(auto &x : e) if(d[x[0]]<INF && d[x[0]]+x[2] < d[x[1]]) d[x[1]] = d[x[0]]+x[2];
  for(int v : d) cout<<v<<" ";
  cout<<"\\n";
}`,'(none)','0 3 1 4','an easy weighted-graph problem asking for the cheapest route using relaxation','relaxation and Bellman-Ford'),
L('Dijkstra with a priority queue',['Bellman-Ford is slow for big graphs. <b>Dijkstra</b> is faster but needs <b>non-negative</b> weights. Idea: always finalise the unfinished vertex that is currently closest to the start; its distance can never improve later, because every other route is already at least as long.','Use a <b>min-heap</b> of (distance, vertex). Pop the smallest; if it is outdated (larger than dist[v]) skip it; otherwise relax each outgoing edge and push improved neighbours. Total cost is O((V+E) log V).','On the same graph, pop (0,0): relax 1 to 4 and 2 to 1. Pop (1,2): relax 1 to 3. Pop (3,1): relax 3 to 4. Pop (4,3) and the outdated (4,1) is skipped. Distances 0 3 1 4. Use long long for distances in big graphs.'],`#include <bits/stdc++.h>
using namespace std;
int main(){
  int n = 4; vector<vector<pair<int,int>>> g(n);
  g[0] = {{1,4},{2,1}}; g[2] = {{1,2}}; g[1] = {{3,1}};
  vector<long long> d(n, LLONG_MAX); d[0] = 0;
  priority_queue<pair<long long,int>, vector<pair<long long,int>>, greater<>> pq;
  pq.push({0,0});
  while(!pq.empty()){
    auto [du,u] = pq.top(); pq.pop();
    if(du > d[u]) continue;
    for(auto [v,w] : g[u]) if(du+w < d[v]){ d[v] = du+w; pq.push({d[v],v}); }
  }
  for(auto x : d) cout<<x<<" ";
  cout<<"\\n";
}`,'(none)','0 3 1 4','a shortest-path problem with positive weights and N,M up to 10^5, needing Dijkstra for full marks','Dijkstra with priority_queue')],
heap:[
L('Priority queues: always the biggest',['Imagine a hospital queue where the most urgent patient is served first, not the one who arrived first. That is a <b>priority queue</b>: you can add items and always remove the largest (or smallest) one.','A <b>heap</b> implements it so that adding and removing each take O(log N), much better than re-sorting every time. In C++, <code>priority_queue&lt;int&gt;</code> is a <b>max-heap</b>: <code>top()</code> is the biggest, <code>pop()</code> removes it, <code>push()</code> adds.','Push 4, 1, 7. Popping repeatedly gives 7, then 4, then 1. Use it whenever you repeatedly need "the current largest/smallest" while the data changes.'],`#include <bits/stdc++.h>
using namespace std;
int main(){
  priority_queue<int> pq;
  pq.push(4); pq.push(1); pq.push(7);
  while(!pq.empty()){ cout<<pq.top()<<" "; pq.pop(); }
  cout<<"\\n";
}`,'(none)','7 4 1','an easy problem needing the k-th largest or repeated extraction of the maximum','priority_queue basics'),
L('Min-heaps and merging greedily',['For the smallest first, declare <code>priority_queue&lt;int, vector&lt;int&gt;, greater&lt;int&gt;&gt;</code>. Many problems combine a heap with a greedy rule: always handle the cheapest item next.','<b>Problem:</b> join ropes of lengths 4 3 2 6 into one; joining two ropes costs the sum of their lengths; minimise the total cost. Greedy: always join the two shortest.','Join 2+3 (cost 5), heap is 4,5,6. Join 4+5 (cost 9), heap is 6,9. Join 6+9 (cost 15). Total 5+9+15 = 29. Each step is O(log N), so the whole thing is O(N log N). Use long long for the total.'],`#include <bits/stdc++.h>
using namespace std;
int main(){
  priority_queue<long long, vector<long long>, greater<long long>> pq;
  for(int x : {4,3,2,6}) pq.push(x);
  long long total = 0;
  while(pq.size() > 1){
    long long a = pq.top(); pq.pop();
    long long b = pq.top(); pq.pop();
    total += a+b; pq.push(a+b);
  }
  cout<<total<<"\\n";
}`,'(none)','29','a greedy problem where a min-heap supplies the cheapest/earliest item at each step','min-heap with greedy merging')],
perm:[
L('Counting arrangements: factorials',['A <b>permutation</b> is an ordering of items. For ABC the orderings are ABC, ACB, BAC, BCA, CAB, CBA: six of them. For N distinct items there are N! = N×(N-1)×...×1 (choose the first in N ways, the next in N-1 ways, and so on).','Factorials explode: 10! = 3,628,800 but 20! is about 2.4×10^18. So permutation brute force is only for N up to about 8 to 10.','C++ can list all permutations in dictionary order: sort the array, then loop with <code>next_permutation</code>, which rearranges to the next order and returns false after the last. For 1 2 3 it prints six lines.'],`#include <bits/stdc++.h>
using namespace std;
int main(){
  vector<int> a = {1,2,3};
  do {
    for(int x : a) cout<<x<<" ";
    cout<<"\\n";
  } while(next_permutation(a.begin(), a.end()));
}`,'(none)','1 2 3\n1 3 2\n2 1 3\n2 3 1\n3 1 2\n3 2 1','an easy problem that tries all orderings of a few items and picks the best (N at most 8)','factorial growth, next_permutation'),
L('Generating permutations by backtracking',['<b>Backtracking</b> builds an answer one position at a time. Fill position 1 with any unused item, mark it used, recurse to fill position 2, then <b>undo</b> (unmark) and try the next item.','This is more flexible than <code>next_permutation</code>: you can stop early when a partial answer already breaks a rule, which is called pruning. It also handles "choose K items in order", not only full arrangements.','Example: ordered pairs from {1,2,3} (K = 2). First slot 1: second slot 2 or 3. First slot 2: second 1 or 3. First slot 3: second 1 or 2. That gives 3×2 = 6 pairs, printed below.'],`#include <bits/stdc++.h>
using namespace std;
int n = 3, k = 2; vector<int> cur; vector<bool> used(4);
void go(){
  if((int)cur.size() == k){ for(int x : cur) cout<<x<<" "; cout<<"\\n"; return; }
  for(int i=1;i<=n;i++) if(!used[i]){
    used[i] = true; cur.push_back(i);
    go();
    cur.pop_back(); used[i] = false;
  }
}
int main(){ go(); }`,'(none)','1 2\n1 3\n2 1\n2 3\n3 1\n3 2','a small search problem (N at most 10) needing recursion over choices with a used[] array','backtracking with used array and pruning')],
dag:[
L('Directed graphs and topological order',['A <b>directed</b> graph has one-way edges (a→b means "a before b"), like course prerequisites. A <b>DAG</b> is a directed graph with <b>no cycles</b>, so you never get stuck in a loop of dependencies.','A <b>topological order</b> lists vertices so every edge goes left to right. <b>Kahn\'s algorithm</b>: compute each vertex\'s in-degree (number of incoming edges); queue all vertices with in-degree 0; pop one, output it, and reduce the in-degree of its targets, queueing any that reach 0.','Edges 0→1, 0→2, 1→3, 2→3. Start with 0. Removing 0 frees 1 and 2. Removing 1 and 2 frees 3. Order: 0 1 2 3. If fewer than V vertices are output, a cycle exists.'],`#include <bits/stdc++.h>
using namespace std;
int main(){
  int n = 4; vector<vector<int>> g = {{1,2},{3},{3},{}};
  vector<int> indeg(n,0); queue<int> q;
  for(int u=0;u<n;u++) for(int v : g[u]) indeg[v]++;
  for(int u=0;u<n;u++) if(indeg[u]==0) q.push(u);
  while(!q.empty()){
    int u = q.front(); q.pop(); cout<<u<<" ";
    for(int v : g[u]) if(--indeg[v]==0) q.push(v);
  }
  cout<<"\\n";
}`,'(none)','0 1 2 3','a dependency/ordering problem solved by topological sort, or detecting a cycle','Kahn\'s algorithm, cycle detection'),
L('DP on a DAG: counting paths',['Because a DAG has a topological order, a vertex\'s answer depends only on vertices before it. That makes DP easy: process vertices in topological order and combine from incoming edges.','<b>Problem:</b> count the number of different paths from vertex 0 to vertex 3. State: ways[v] = number of paths from 0 to v. Base ways[0] = 1. For each edge u→v, add ways[u] to ways[v].','Edges 0→1, 0→2, 1→3, 2→3: ways[1] = 1, ways[2] = 1, ways[3] = ways[1]+ways[2] = 2 (paths 0-1-3 and 0-2-3). The same idea gives the longest path or the cheapest path in a DAG in O(V+E).'],`#include <bits/stdc++.h>
using namespace std;
int main(){
  int n = 4; vector<vector<int>> g = {{1,2},{3},{3},{}};
  vector<long long> ways(n,0); ways[0] = 1;
  for(int u=0;u<n;u++)           // 0..3 is already a topological order
    for(int v : g[u]) ways[v] += ways[u];
  cout<<ways[3]<<"\\n";
}`,'(none)','2','a longest-path or count-the-paths problem on a DAG solved with DP in topological order','DP in topological order')],
pre:[
L('Prefix sums: range sums in O(1)',['Suppose you must answer many questions of the form "what is the sum of a[l..r]?". Adding the range each time costs O(N) per question. Instead, pre-compute once.','Build <b>pref</b> where pref[i] is the sum of the first i elements (pref[0] = 0). Then the sum of a[l..r] (0-indexed) is pref[r+1] - pref[l]: everything up to r, minus everything before l.','For a = 2 5 3 7 1, pref = 0 2 7 10 17 18. Sum of indices 1..3 is pref[4] - pref[1] = 17 - 2 = 15 (that is 5+3+7). Setup is O(N) and each query O(1). Use long long.'],`#include <bits/stdc++.h>
using namespace std;
int main(){
  vector<int> a = {2,5,3,7,1}; int n = a.size();
  vector<long long> pref(n+1, 0);
  for(int i=0;i<n;i++) pref[i+1] = pref[i] + a[i];
  int l = 1, r = 3;
  cout<<pref[r+1]-pref[l]<<"\\n";
}`,'(none)','15','a many-queries range-sum problem where N and Q are up to 10^5','building and using a prefix array'),
L('Difference arrays: many range updates',['Prefix sums answer range <i>queries</i>. The reverse trick, a <b>difference array</b>, handles many range <i>updates</i>: "add v to every element from l to r", done Q times.','Record only the endpoints: d[l] += v and d[r+1] -= v. At the end, take the prefix sum of d to recover the real array. Each update becomes O(1) instead of O(N).','Start with 5 zeros. Add 3 on [1,3] and 2 on [2,4]. Then d = 0 3 2 0 -3 -2 and its prefix sums are 0 3 5 5 2. That is correct: index 2 and 3 got both additions. It is the inverse of prefix sums.'],`#include <bits/stdc++.h>
using namespace std;
int main(){
  int n = 5; vector<int> d(n+1, 0);
  d[1] += 3; d[4] -= 3;   // add 3 on [1,3]
  d[2] += 2; d[5] -= 2;   // add 2 on [2,4]
  int cur = 0;
  for(int i=0;i<n;i++){ cur += d[i]; cout<<cur<<" "; }
  cout<<"\\n";
}`,'(none)','0 3 5 5 2','a problem with many range-add operations followed by one final read-out','difference array')],
sw:[
L('Fixed-size sliding window',['A <b>window</b> is a block of consecutive elements. Sliding it one step right means one element enters and one leaves, so you do not need to recompute everything.','<b>Problem:</b> find the largest sum of any K consecutive numbers. Keep the sum of the current window; moving right, add the new element and subtract the one that left. That is O(N) instead of O(N·K).','For 2 1 5 1 3 2 with K = 3: the window sums are 8 (2,1,5), 7, 9 (5,1,3) and 6. The maximum is 9.'],`#include <bits/stdc++.h>
using namespace std;
int main(){
  vector<int> a = {2,1,5,1,3,2}; int k = 3, n = a.size();
  long long cur = 0, best = 0;
  for(int i=0;i<n;i++){
    cur += a[i];
    if(i >= k) cur -= a[i-k];
    if(i >= k-1) best = max(best, cur);
  }
  cout<<best<<"\\n";
}`,'(none)','9','an easy problem on the best/average of every block of K consecutive items','fixed-length window with running sum'),
L('Variable window: longest subarray with sum at most K',['Now the size changes. With <b>positive</b> numbers: extend the right end each step; if the sum becomes too large, move the left end forward until it is valid again. Every pointer only moves forward, so total work is O(N).','Why it works: for positive numbers, removing elements from the left can only lower the sum, so once the window is valid we never need to restart. (With negative numbers this breaks; use prefix sums instead.)','For 2 1 5 1 3 2 with limit 7: [2,1] has sum 3; adding 5 gives 8, so drop 2 to get 6; add 1 gives 7 (length 3); add 3 gives 10, drop 1 and 5 to get 4; add 2 gives 6 (length 3). The longest valid window has length 3.'],`#include <bits/stdc++.h>
using namespace std;
int main(){
  vector<int> a = {2,1,5,1,3,2}; int K = 7, n = a.size(), l = 0, best = 0;
  long long sum = 0;
  for(int r=0;r<n;r++){
    sum += a[r];
    while(sum > K) sum -= a[l++];
    best = max(best, r-l+1);
  }
  cout<<best<<"\\n";
}`,'(none)','3','a longest/shortest subarray problem with a sum or count limit on positive numbers','variable window with two pointers')]
});
// helper: every lesson links to a topic video search
window.videoURL=(c,x)=>'https://www.youtube.com/results?search_query='+encodeURIComponent(c.n+' '+x.t+' C++ explained for beginners');
