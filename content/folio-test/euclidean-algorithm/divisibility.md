For integers $a$ and $b$, we say $b$ **divides** $a$, written $b \mid a$, when
$a = bq$ for some integer $q$. A **common divisor** of $a$ and $b$ is an
integer dividing both.

The set of common divisors of $a$ and $b$ is never empty — $1$ divides
everything — and when $a$ and $b$ are not both zero it is bounded above by
$\max(|a|, |b|)$. So it has a largest element, the **greatest common
divisor** $\gcd(a, b)$.

Two facts about this set are worth separating, because the algorithm in the
next section rests entirely on the second and not at all on the first:

- $\gcd(a,b)$ is the largest common divisor, and
- the *set* of common divisors of $a$ and $b$ is unchanged by replacing $a$
  with $a - qb$ for any integer $q$.

The second is the load-bearing one. It says the pair $(a,b)$ can be shrunk
without disturbing the answer, and shrinking is what the algorithm does.
