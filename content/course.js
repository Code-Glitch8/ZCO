// Lesson-by-lesson course. Easy chapters have fewer lessons, harder ones more.
// Fields: t title, e explanation (HTML), code (C++), inp sample input, out sample output, qk question kind, qf focus.
window.COURSE={
intro:[
{t:'What is an algorithm?',e:`<p>An <b>algorithm</b> is a recipe: a list of clear steps that turns an <b>input</b> into an <b>output</b>. A recipe must be finite (it ends) and unambiguous (no step says "add some salt, maybe").</p><p><b>Problem:</b> given N numbers, find the largest. <b>Idea:</b> keep a variable <code>best</code> holding the biggest number seen so far. Start with the first number, look at each remaining number once, and replace <code>best</code> whenever you see something bigger.</p><p>Trace for 4 9 2 7 1: best=4, then 9 (bigger, best=9), then 2, 7, 1 are smaller, so best stays 9. We looked at each number once, so the work grows in step with N.</p>`,
code:`#include <bits/stdc++.h>
using namespace std;
int main(){
  int n; cin>>n;
  vector<int> a(n);
  for(auto &x : a) cin>>x;
  int best = a[0];
  for(int i=1;i<n;i++) best = max(best, a[i]);
  cout<<"Largest = "<<best<<"\\n";
}`,inp:`5
4 9 2 7 1`,out:`Largest = 9`,qk:'a very easy warm-up problem needing one loop and one variable',qf:'finding a maximum/minimum or counting items in an array'},
{t:'Input, loops and totals (ZCO style)',e:`<p>Every ZCO problem tells you the input format, e.g. "first line N, second line N integers". You read exactly that, compute, and print exactly the required output, with no extra words (unless asked).</p><p><b>Problem:</b> print the sum of the N numbers. <b>Key beginner trap:</b> when N can be 10^5 and values 10^9, the sum can reach 10^14, which overflows <code>int</code> (max about 2.1x10^9). Use <code>long long</code> for totals.</p><p>Trace for 4 9 2 7 1: total 0, then 4, 13, 15, 22, 23.</p>`,
code:`#include <bits/stdc++.h>
using namespace std;
int main(){
  int n; cin>>n;
  long long total = 0;
  for(int i=0;i<n;i++){ int x; cin>>x; total += x; }
  cout<<total<<"\\n";
}`,inp:`5
4 9 2 7 1`,out:`23`,qk:'an easy problem on reading input and printing a computed total, where overflow matters',qf:'sums, counts, and choosing int vs long long'}],
eff:[
{t:'Counting operations and Big-O',e:`<p>Speed is judged by <b>how many basic steps</b> a program does as N grows, not by seconds on your laptop. We write this as <b>Big-O</b>, keeping only the fastest-growing part: 3N+5 steps is O(N); N*N/2 steps is O(N^2).</p><p>Rules of thumb: one loop over N is O(N); a loop inside a loop is O(N^2); a loop that halves the range each time is O(log N).</p><p><b>Example:</b> counting all pairs (i,j) with i&lt;j. For N=4 the pairs are (0,1)(0,2)(0,3)(1,2)(1,3)(2,3) = 6 = N(N-1)/2, which grows like N^2.</p>`,
code:`#include <bits/stdc++.h>
using namespace std;
int main(){
  int n = 4; long long pairs = 0;
  for(int i=0;i<n;i++)
    for(int j=i+1;j<n;j++) pairs++;
  cout<<"pairs = "<<pairs<<"\\n";
}`,inp:`(none)`,out:`pairs = 6`,qk:'a short question asking the learner to work out the time complexity of given loops',qf:'counting operations in single and nested loops'},
{t:'Will my solution pass? The 10^8 rule',e:`<p>A computer does roughly <b>10^8 simple operations per second</b>, and ZCO gives about 1 second per test. Read the constraint on N, then pick an algorithm that fits:</p><p>N up to 10^3: O(N^2) is fine (10^6). N up to 10^5: you need O(N log N) or better, because N^2 = 10^10 is far too slow. N up to 20: even O(2^N) works.</p><p>This is why ZCO has <b>subtasks</b>: a slow brute force passes small N for partial marks, and a clever algorithm passes everything. Below we compare operation counts for N=1000.</p>`,
code:`#include <bits/stdc++.h>
using namespace std;
int main(){
  long long n = 1000;
  cout<<n*n<<" "<<(long long)(n*log2((double)n))<<"\\n";
}`,inp:`(none)`,out:`1000000 9965`,qk:'a problem with a large N where the obvious O(N^2) idea is too slow and the learner must reason about limits',qf:'choosing an algorithm from the constraints'}],
bs:[
{t:'Linear search: the slow way',e:`<p><b>Searching</b> means finding whether a value is in a list and where. The simplest method, <b>linear search</b>, checks positions 0, 1, 2... until it finds the value. In the worst case it checks all N items: O(N).</p><p>For 2 5 8 12 16 23 38 56 and target 23 it checks 2, 5, 8, 12, 16, 23: six checks. With Q = 10^5 queries on N = 10^5 numbers that is 10^10 steps, far too slow, which motivates the next lesson.</p>`,
code:`#include <bits/stdc++.h>
using namespace std;
int main(){
  vector<int> a = {2,5,8,12,16,23,38,56};
  int x = 23, checks = 0, pos = -1;
  for(int i=0;i<(int)a.size();i++){
    checks++;
    if(a[i]==x){ pos = i; break; }
  }
  cout<<"Found at index "<<pos<<" after "<<checks<<" checks\\n";
}`,inp:`(none)`,out:`Found at index 5 after 6 checks`,qk:'an easy problem answering many yes/no membership queries first by brute force, so the learner feels why it is slow',qf:'linear search and its cost'},
{t:'Binary search on a sorted array',e:`<p>If the list is <b>sorted</b>, look at the middle item. If it is too small, the target must be in the right half, so throw the left half away. Repeat. Each check halves the work: about log2(N) checks (20 for a million items).</p><p>Keep an interval [lo, hi] and promise: <i>if the target exists, it is inside [lo, hi]</i>. Trace for target 23: lo=0, hi=7, mid=3 holds 12 (too small) so lo=4. Now mid=5 holds 23: found after 2 checks (linear needed 6).</p><p>Use <code>mid = lo + (hi-lo)/2</code> to avoid overflow, and loop while <code>lo &lt;= hi</code>. C++ also has <code>binary_search</code>, <code>lower_bound</code> and <code>upper_bound</code>.</p>`,
code:`#include <bits/stdc++.h>
using namespace std;
int main(){
  vector<int> a = {2,5,8,12,16,23,38,56};
  int x = 23, lo = 0, hi = 7, checks = 0, pos = -1;
  while(lo <= hi){
    int mid = lo + (hi-lo)/2; checks++;
    if(a[mid]==x){ pos = mid; break; }
    if(a[mid] < x) lo = mid+1; else hi = mid-1;
  }
  cout<<"Found at index "<<pos<<" after "<<checks<<" checks\\n";
}`,inp:`(none)`,out:`Found at index 5 after 2 checks`,qk:'a problem with a sorted list and up to 10^5 queries that needs binary search or lower_bound for full marks',qf:'binary search on a sorted array, lower_bound/upper_bound'},
{t:'Binary search on the answer',e:`<p>The big ZCO trick: you can binary search not only a list but the <b>answer itself</b>. It works when a yes/no test is <b>monotone</b>: if length L works then every smaller L also works (YES YES YES NO NO NO).</p><p><b>Problem:</b> ropes of lengths 8, 5, 12. Cut equal pieces of integer length L, at least K = 5 pieces in total. Find the largest L. Check(L) = sum of (length / L). L=4: 2+1+3 = 6 pieces, ok. L=5: 1+1+2 = 4, not enough. So the answer is 4.</p><p>Instead of trying every L, binary search L between 1 and the longest rope, so the cost is O(N log maxLength).</p>`,
code:`#include <bits/stdc++.h>
using namespace std;
int main(){
  vector<int> len = {8,5,12};
  long long k = 5, lo = 1, hi = 12, best = 0;
  while(lo <= hi){
    long long m = lo + (hi-lo)/2, cnt = 0;
    for(int v : len) cnt += v/m;
    if(cnt >= k){ best = m; lo = m+1; }
    else hi = m-1;
  }
  cout<<"Best length = "<<best<<"\\n";
}`,inp:`(none)`,out:`Best length = 4`,qk:'a "maximise/minimise a value such that a condition holds" problem solved by binary search on the answer with a check function',qf:'monotone check functions, binary search on the answer'}],
dp:[
{t:'Why DP? Remembering answers',e:`<p><b>Dynamic Programming</b> is recursion plus a notebook. If a problem splits into smaller copies of itself and the same small copies appear again and again, solve each once and write the answer down.</p><p>Fibonacci: f(n)=f(n-1)+f(n-2). Naive recursion recomputes f(3) many times and is exponential. Storing f(0), f(1), f(2)... in an array makes it O(N).</p><p>Order of filling: always fill so that the smaller answers you need are already written.</p>`,
code:`#include <bits/stdc++.h>
using namespace std;
int main(){
  int n = 10; vector<long long> f(n+1);
  f[0] = 0; f[1] = 1;
  for(int i=2;i<=n;i++) f[i] = f[i-1] + f[i-2];
  cout<<f[n]<<"\\n";
}`,inp:`(none)`,out:`55`,qk:'an easy problem where plain recursion repeats work and storing results fixes it',qf:'memoisation vs bottom-up tables'},
{t:'The 4-step recipe: counting ways',e:`<p>Every DP uses four steps. (1) <b>State</b>: say in one sentence what dp[i] means. (2) <b>Recurrence</b>: how dp[i] comes from smaller states. (3) <b>Base cases</b>. (4) <b>Order</b>.</p><p><b>Problem:</b> climb n stairs taking 1 or 2 steps at a time; how many ways? State: dp[i] = ways to reach stair i. The last move was 1 step (from i-1) or 2 steps (from i-2), so dp[i]=dp[i-1]+dp[i-2]. Base: dp[0]=dp[1]=1. Values: 1, 1, 2, 3, 5, 8, so 5 stairs give 8 ways.</p>`,
code:`#include <bits/stdc++.h>
using namespace std;
int main(){
  int n = 5; vector<long long> dp(n+1);
  dp[0] = dp[1] = 1;
  for(int i=2;i<=n;i++) dp[i] = dp[i-1] + dp[i-2];
  cout<<dp[n]<<"\\n";
}`,inp:`(none)`,out:`8`,qk:'a counting-ways problem (stairs, coin ways or paths) where the learner must define dp[i] and the recurrence',qf:'defining the state and recurrence for counting problems'},
{t:'Choose or skip: maximum sum, no two adjacent',e:`<p>Many DPs are a <b>take it or leave it</b> decision. <b>Problem:</b> pick numbers from a row so that no two chosen numbers are neighbours, maximising the sum. For 3 2 7 10 the best is 3+10 = 13.</p><p>State: dp[i] = best sum using only the first i numbers. For number i: <b>skip</b> it, keeping dp[i-1]; or <b>take</b> it, adding a[i] to dp[i-2] (its neighbour is not allowed). So dp[i]=max(dp[i-1], dp[i-2]+a[i]). Table: 0, 3, 3, 10, 13.</p>`,
code:`#include <bits/stdc++.h>
using namespace std;
int main(){
  vector<int> a = {0,3,2,7,10}; // 1-indexed
  int n = 4; vector<long long> dp(n+1);
  dp[0] = 0; dp[1] = a[1];
  for(int i=2;i<=n;i++) dp[i] = max(dp[i-1], dp[i-2] + a[i]);
  cout<<dp[n]<<"\\n";
}`,inp:`(none)`,out:`13`,qk:'a take-or-skip optimisation problem with a restriction between chosen items',qf:'dp[i] = best using first i items, with take/skip transitions'},
{t:'Longest Increasing Subsequence (LIS)',e:`<p>A <b>subsequence</b> keeps the original order but may skip items. <b>Problem:</b> longest strictly increasing subsequence of 10 9 2 5 3 7 101 18. One answer is 2, 3, 7, 18 (length 4).</p><p>State: dp[i] = length of the longest increasing subsequence <b>ending at</b> position i. Every item alone gives 1. Otherwise look at every earlier j with a[j] &lt; a[i] and extend its best: dp[i]=1+max(dp[j]). The final answer is the <b>maximum over all</b> dp[i], not just the last. Cost O(N^2), enough for N up to a few thousand (ZCO subtasks).</p>`,
code:`#include <bits/stdc++.h>
using namespace std;
int main(){
  vector<int> a = {10,9,2,5,3,7,101,18};
  int n = a.size(), ans = 0; vector<int> dp(n,1);
  for(int i=0;i<n;i++){
    for(int j=0;j<i;j++) if(a[j] < a[i]) dp[i] = max(dp[i], dp[j]+1);
    ans = max(ans, dp[i]);
  }
  cout<<ans<<"\\n";
}`,inp:`(none)`,out:`4`,qk:'a sequence problem (LIS or a variant such as longest non-decreasing or a grid path) with an O(N^2) DP for partial marks',qf:'dp ending at index i, taking the maximum over all i'}]
};
