import numpy as np
import math

def logistic(z):
    """
    The logistic function
    Input:
       z   numpy array (any shape)
    Output:
       p   numpy array with same shape as z, where p = logistic(z) entrywise
    """
    
    logistic_fn = lambda x: 1 / (1 + math.pow(math.e, -x))
    p = np.vectorize(logistic_fn)(z)
    return p

def cost_function(X, y, theta):
    """
    Compute the cost function for a particular data set and hypothesis (weight vector)
    Inputs:
        X      data matrix (2d numpy array with shape m x n)
        y      label vector (1d numpy array -- length m)
        theta  parameter vector (1d numpy array -- length n)
    Output:
        cost   the value of the cost function (scalar)
    """
    
    g_theta = logistic(np.dot(X, theta))
    err_i = lambda g_theta, y: -y * math.log(g_theta) - (1 - y) * math.log(1 - g_theta)

    cost = np.sum(np.vectorize(err_i)(g_theta, y))
    return cost

def gradient_descent( X, y, theta, alpha, iters ):
    """
    Fit a logistic regression model by gradient descent.
    Inputs:
        X          data matrix (2d numpy array with shape m x n)
        y          label vector (1d numpy array -- length m)
        theta      initial parameter vector (1d numpy array -- length n)
        alpha      step size (scalar)
        iters      number of iterations (integer)
    Return (tuple):
        theta      learned parameter vector (1d numpy array -- length n)
        J_history  cost function in iteration (1d numpy array -- length iters)
    """

    J_history = [0 for _ in range(iters)]
    for iter in range(iters):
        J_history[iter] = cost_function(X, y, theta)

        h_theta = lambda X_i: logistic(np.dot(theta.T, X_i))
        partial_J = lambda X_i, y_i: (h_theta(X_i) - y_i) * X_i
        partial_J_matrix = np.array([partial_J(X[row_idx,:], y[row_idx]) for row_idx in range(X.shape[0])])
        
        theta = theta - alpha * np.sum(partial_J_matrix, 0)

    return theta, J_history