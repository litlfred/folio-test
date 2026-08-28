Run the algorithm on $a = 1071$, $b = 462$:

$$1071 = 2 \cdot 462 + 147$$
$$462 = 3 \cdot 147 + 21$$
$$147 = 7 \cdot 21 + 0$$

The last non-zero remainder is $21$, so $\gcd(1071, 462) = 21$. Checking
directly: $1071 = 21 \cdot 51$ and $462 = 21 \cdot 22$, and $51$ and $22$
share no factor.

Three divisions for a pair over a thousand. That is not luck — the worst case
is bounded by the number of digits, with consecutive Fibonacci numbers as the
extremal input, since each is the sum of the previous two and so forces a
quotient of exactly $1$ at every step.

The full trace is tabulated in [the trace table](#tbl:euclid-trace).
