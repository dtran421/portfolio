import numpy as np

def cost_function( x, y, theta_0, theta_1 ):
   """Compute the squared error cost function

   Inputs:
   x        vector of length m containing x values
   y        vector of length m containing y values
   theta_0  (scalar) intercept parameter
   theta_1  (scalar) slope parameter

   Returns:
   cost     (scalar) the cost
   """

   cost = 1/2 * np.sum((theta_0 + (theta_1 * x) - y) ** 2)

   return cost


def gradient(x, y, theta_0, theta_1):
    """Compute the partial derivative of the squared error cost function

    Inputs:
    x          vector of length m containing x values
    y          vector of length m containing y values
    theta_0    (scalar) intercept parameter
    theta_1    (scalar) slope parameter

    Returns:
    d_theta_0  (scalar) Partial derivative of cost function wrt theta_0
    d_theta_1  (scalar) Partial derivative of cost function wrt theta_1
    """

    d_theta_0 = np.sum(theta_0 + (theta_1 * x) - y)
    d_theta_1 = np.sum((theta_0 + (theta_1 * x) - y) * x)

    return d_theta_0, d_theta_1 # return is a tuple