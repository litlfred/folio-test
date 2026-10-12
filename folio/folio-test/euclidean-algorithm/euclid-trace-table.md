| step | $a$ | $b$ | $q$ | $r$ |
|-----:|----:|----:|----:|----:|
| 1 | 1071 | 462 | 2 | 147 |
| 2 | 462 | 147 | 3 | 21 |
| 3 | 147 | 21 | 7 | 0 |
| 4 | 21 | 0 | — | — |

Row 4 is the base case: $b = 0$, so the algorithm returns $|a| = 21$.

Reading the $q$ column downwards gives $[2, 3, 7]$, which is the continued
fraction expansion of $1071/462$. That is not a coincidence — the Euclidean
algorithm and continued-fraction expansion are the same computation, and the
quotients are the partial quotients.
