"""
Custom SVM Kernels

Author: Eric Eaton, 2014

"""

import numpy as np

_polyDegree = 2
_gaussSigma = 1


def myPolynomialKernel(X1, X2):
    """
        Arguments:
            X1 - an n1-by-d numpy array of instances
            X2 - an n2-by-d numpy array of instances
        Returns:
            An n1-by-n2 numpy array representing the Kernel (Gram) matrix
    """
    kernel_matrix = [[0 for _ in range(X2.shape[0])] for _ in range(X1.shape[0])]
    for i in range(X1.shape[0]):
        for j in range(X2.shape[0]):
            kernel_matrix[i][j] = np.dot(X1[i,:], X2[j,:])

    kernel_matrix = (np.array(kernel_matrix) + 1) ** _polyDegree

    return kernel_matrix


def pairwise(X1_i, X2_j):
    return np.sqrt(np.sum((X1_i - X2_j) ** 2))

def myGaussianKernel(X1, X2):
    """
        Arguments:
            X1 - an n1-by-d numpy array of instances
            X2 - an n2-by-d numpy array of instances
        Returns:
            An n1-by-n2 numpy array representing the Kernel (Gram) matrix
    """
    kernel_matrix = [[0 for _ in range(X2.shape[0])] for _ in range(X1.shape[0])]

    for i in range(X1.shape[0]):
        for j in range(X2.shape[0]):
            kernel_matrix[i][j] = pairwise(X1[i,:], X2[j,:])

    kernel_matrix = np.exp(-(np.array(kernel_matrix) ** 2 / (2 * _gaussSigma ** 2)))

    return kernel_matrix
