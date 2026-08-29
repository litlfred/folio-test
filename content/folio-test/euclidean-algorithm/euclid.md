**Input.** Integers $a, b$, not both zero.
**Output.** $\gcd(a, b)$.

1. If $b = 0$, return $|a|$.
2. Otherwise write $a = qb + r$ with $0 \le r < |b|$.
3. Replace $(a, b)$ by $(b, r)$ and go to step 1.

**Correctness.** Every iteration preserves $\gcd(a,b)$ by
[the reduction step](#lem:euclid-step), and the returned value is correct in
the base case because the common divisors of $a$ and $0$ are exactly the
divisors of $a$, the greatest of which is $|a|$.

**Termination.** The second component is a non-negative integer that strictly
decreases each iteration: $r < |b|$ by construction. A strictly decreasing
sequence of non-negative integers is finite, so the loop halts.

The two arguments are independent, and the split is worth keeping in view:
correctness needs only that $r \equiv a \pmod b$, while termination needs
$r$ to be *smaller*. An implementation that took $r$ to be any residue would
still be correct and might not stop.
