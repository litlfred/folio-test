Bézout's identity is the step that turns the greatest common divisor from a
quantity you can *compute* into one you can *reason with*.

Two immediate consequences:

**Coprimality is an equation.** $\gcd(a,b) = 1$ if and only if
$ax + by = 1$ has an integer solution. The forward direction is the theorem;
the reverse is immediate, since any common divisor of $a$ and $b$ divides the
left side and hence divides $1$.

**Modular inverses exist exactly when they should.** If $\gcd(a, n) = 1$
then $ax + ny = 1$ for some $x$, so $ax \equiv 1 \pmod n$ — and $x$ is
computed, not merely asserted to exist, by running the extended algorithm.
This is what makes $\mathbb{Z}/n\mathbb{Z}$ a field precisely when $n$ is
prime.

Neither consequence needs the *greatest* part of "greatest common divisor".
Both follow from the divisibility characterisation in
[the opening prose](#prose:divisibility): the set of integer combinations of
$a$ and $b$ is exactly the set of multiples of their gcd.
