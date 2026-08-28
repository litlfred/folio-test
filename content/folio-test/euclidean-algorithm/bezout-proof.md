Let $S = \{ax + by : x, y \in \mathbb{Z}\} \cap \mathbb{Z}_{>0}$. Since $a$
and $b$ are not both zero, $S$ contains $|a|$ or $|b|$ and so is non-empty;
let $d$ be its least element, say $d = ax_0 + by_0$.

**Every element of $S$ is a multiple of $d$.** Take $ax + by \in S$ and
divide: $ax + by = qd + r$ with $0 \le r < d$. Then
$$r = a(x - qx_0) + b(y - qy_0),$$
so $r$ is of the form $ax' + by'$. If $r > 0$ it lies in $S$ and is smaller
than $d$, contradicting minimality. So $r = 0$.

**$d$ is a common divisor.** Apply the previous paragraph to $a = a\cdot 1 +
b \cdot 0$ and to $b = a \cdot 0 + b \cdot 1$, both of which are of the
required form (taking absolute values if needed). So $d \mid a$ and
$d \mid b$.

**$d$ is the greatest one.** Any common divisor $e$ of $a$ and $b$ divides
$ax_0 + by_0 = d$, hence $e \le d$. So $d = \gcd(a,b)$. $\square$

This proof is non-constructive: it produces $x_0$ and $y_0$ from a
minimality argument and never says how to find them. The extended Euclidean
algorithm does, by carrying a pair of coefficients through
[the reduction step](#lem:euclid-step) — at each stage $r = a - qb$ is
already an integer combination of the previous two, so back-substituting
through [the trace](#tbl:euclid-trace) yields $x$ and $y$ directly.
