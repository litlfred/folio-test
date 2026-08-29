It suffices to show the two pairs have the *same set* of common divisors; the
greatest element of that set is then the same on both sides.

Let $d$ be a common divisor of $a$ and $b$. From $r = a - qb$, and since $d$
divides both terms on the right, $d \mid r$. So $d$ is a common divisor of
$b$ and $r$.

Conversely let $d$ be a common divisor of $b$ and $r$. From $a = qb + r$, and
since $d$ divides both terms on the right, $d \mid a$. So $d$ is a common
divisor of $a$ and $b$.

The two sets contain each other, hence are equal, and their greatest elements
coincide. $\square$

Note what the argument does not use: nothing about $r$ being *least*
non-negative, and nothing about $q$ beyond its being an integer. Any $q$
gives a valid reduction. The division algorithm's choice of $q$ matters for
*termination*, which is the subject of the next block, not for correctness of
this step.
