---
layout: post
title:  "Cobaan!"
date:   2016-02-03 14:49:00 +0700
author: Rahadian Yusuf
tags:
- kuliah
- college
---

I'm doing coding an implementation of an fully connected, multi--layered
feed--forward neural network. I tried to implement backpropagation algorithm as see in
Russell and Norvig's *Artificial Intelligence: A Modern Approach* while
using matrix as internal weight representation.

<!-- more -->

Here is the matrix representation of the weight for one layer:

$$
W_t =
    \begin{pmatrix}
        w_{0,1} & w_{0,2} & \cdots & w_{0,k} \\
        w_{1,1} & w_{1,2} & \cdots & w_{1,k} \\
        w_{2,1} & w_{2,2} & \cdots & w_{2,k} \\
        \vdots  & \vdots  & \ddots & \vdots  \\
        w_{j,1} & w_{j,2} & \cdots & w_{j,k}
    \end{pmatrix}
$$

In !$W_t$!, let we define !$w_{j,k}$! as weight of connection from
unit !$j$! to unit !$k$!.
I added additional row for keeping weight of biased value !$w_{0,k}$!.

To get the output of unit !$k$!, first we get the weighted sum of its
inputs:

$$
in_k = \sum_{j = 0}^{n}w_{j,k}a_j
$$

Then, we derive the output of the unit by passing the sum to
an activation function:

$$
a_k = g(in_k) = g\left(\sum_{j = 0}^{n}w_{j,k}a_j\right)
$$

Now, how could I get the output vector !$\vec{o}$! given input vector
!$\vec{a}$! and weight matrix !$W$!?

Let matrix for input M:

$$
\begin{align}
M & =
\begin{pmatrix}
    w_{0,1}a_0 & w_{0,2}a_0 & \cdots & w_{0,k}a_0 \\
    w_{1,1}a_1 & w_{1,2}a_1 & \cdots & w_{1,k}a_1 \\
    \vdots & \vdots & \ddots & \vdots \\
    w_{j,1}a_j & w_{j,2}a_j & \cdots & w_{j,k}a_j
\end{pmatrix}
\end{align}
$$

where element of !$M$!, !$m_{j,k}$!:

$$m_{j,k} = w_{j,k}a_j$$

with dummy input !$a_0 = 1$! with associated weight !$w_{0,j}$!.

Now, let function !$\Phi$!:

$$
\Phi(\phi) = e^\intercal\phi
$$

where !$e$! is row vector of ones, or !$e = (1, 1, \cdots, 1)$!.

Now, to get vectors of weighted input !$\vec{in}$!:

$$
\vec{in} = \Phi(M)
$$

Simple.

Now, I want matrix of inputs !$A$! such as:

$$
AW_t = M
$$

Let's see...

$$
\begin{align}
AW_t & = M \\
A     \begin{pmatrix}
        w_{0,1} & w_{0,2} & \cdots & w_{0,k} \\
        w_{1,1} & w_{1,2} & \cdots & w_{1,k} \\
        w_{2,1} & w_{2,2} & \cdots & w_{2,k} \\
        \vdots  & \vdots  & \ddots & \vdots  \\
        w_{j,1} & w_{j,2} & \cdots & w_{j,k}
    \end{pmatrix} & =
    \begin{pmatrix}
        w_{0,1}a_0 & w_{0,2}a_0 & \cdots & w_{0,k}a_0 \\
        w_{1,1}a_1 & w_{1,2}a_1 & \cdots & w_{1,k}a_1 \\
        \vdots & \vdots & \ddots & \vdots \\
        w_{j,1}a_j & w_{j,2}a_j & \cdots & w_{j,k}a_j
    \end{pmatrix}
\end{align}
$$

Now, let's see the rule of weight--update for network with !$i$!
input units, !$j$! hidden units, and !$k$! output unit.
For connections between hidden units and output units:

$$w_{j,k} \leftarrow w_{j,k} + \alpha \times a_j \times \Delta_k$$

where

$$\Delta_k = Err_k \times g'(in_k)$$

For connections between input units and hidden units:

$$w_{i,j} \leftarrow w_{i,j} + \alpha \times a_i \times \Delta_j$$

where

$$\Delta_j = g'(in_j) \times \sum_{k}w_{j,k}\Delta_k$$

As you note, the weight--update rule for connections between input units
and hidden units with update rule for output units is identical---it differ
only in definition of !$\Delta$!.

Now, I will put these into matrix for updated weight matrix !$W_{t+1}$!:

<div class="table-responsive smaller-math">
$$
\begin{align}
W_{t+1} & =
  \begin{pmatrix}
    w_{1,1} + \alpha \times a_1 \times \Delta_1 & w_{1,2} + \alpha \times a_1 \times \Delta_2 & \cdots & w_{1,k} + \alpha \times a_1 \times \Delta_k \\
    w_{2,1} + \alpha \times a_2 \times \Delta_1 & w_{2,2} + \alpha \times a_2 \times \Delta_2 & \cdots & w_{2,k} + \alpha \times a_2 \times \Delta_k \\
    \vdots  & \vdots  & \ddots & \vdots  \\
    w_{j,1} + \alpha \times a_j \times \Delta_1 & w_{j,2} + \alpha \times a_j \times \Delta_2 & \cdots & w_{j,k} + \alpha \times a_j \times \Delta_k \\
    w_{bias,1} + \alpha \times -1 \times \Delta_1 & w_{bias,2} + \alpha \times -1 \times \Delta_2 & \cdots & w_{bias,k} + \alpha \times -1 \times \Delta_k \\
  \end{pmatrix} \\
  & =
   \begin{pmatrix}
    w_{1,1} & w_{1,2} & \cdots & w_{1,k} \\
    w_{2,1} & w_{2,2} & \cdots & w_{2,k} \\
    \vdots  & \vdots  & \ddots & \vdots  \\
    w_{j,1} & w_{j,2} & \cdots & w_{j,k} \\
    w_{bias,1} & w_{bias,2} & \cdots & w_{bias,k}
   \end{pmatrix} +
    \begin{pmatrix}
      \alpha \times a_1 \times \Delta_1 & \alpha \times a_1 \times \Delta_2 & \cdots & \alpha \times a_1 \times \Delta_k \\
      \alpha \times a_2 \times \Delta_1 & \alpha \times a_2 \times \Delta_2 & \cdots & \alpha \times a_2 \times \Delta_k \\
      \vdots  & \vdots  & \ddots & \vdots  \\
      \alpha \times a_j \times \Delta_1 & \alpha \times a_j \times \Delta_2 & \cdots & \alpha \times a_j \times \Delta_k \\
      \alpha \times -1 \times \Delta_1 & \alpha \times -1 \times \Delta_2 & \cdots & \alpha \times -1 \times \Delta_k \\
    \end{pmatrix}
  \\
  & = W_t + \alpha \times
    \begin{pmatrix}
      a_1 \times \Delta_1 & a_1 \times \Delta_2 & \cdots & a_1 \times \Delta_k \\
      a_2 \times \Delta_1 & a_2 \times \Delta_2 & \cdots & a_2 \times \Delta_k \\
      \vdots  & \vdots  & \ddots & \vdots  \\
      a_j \times \Delta_1 & a_j \times \Delta_2 & \cdots & a_j \times \Delta_k \\
      -\Delta_1 & -\Delta_2 & \cdots & -\Delta_k \\
    \end{pmatrix} \\
  & = W_t + \alpha \times
    \begin{pmatrix}
      a_1 \\
      a_2 \\
      \vdots \\
      a_j \\
      -1
    \end{pmatrix} \times
    \begin{pmatrix}
    \Delta_1 & \Delta_2 & \cdots & \Delta_k
    \end{pmatrix}
\end{align}
$$
