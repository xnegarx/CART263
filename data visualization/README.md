# **Know Your Iris**
Negar Roofigari 
I chose this dataset for several reasons. Firstly, I wanted to explore the art of species classifications. Secondly, I found that when looking at data like this or its mathematical graph, it's difficult to grasp what is being communicated. However, once the data is visualized, it becomes more captivating and exciting.
In this particular dataset, the average is crucial, and my idea was to show this average through opacity. In other words, I wanted to create a higher overlap of the petals to demonstrate the average. 
## Explanation:
To explain the visualization, the petal lengths are divided into three classes: Setosa, Versicolor, and Virginica. Each flower has a center (centerX, centerY) from which the scaled length of the petals (radii) are drawn.  If let's say the petal lengths are: 1.3, 1.5, 3 and a circle of diameter 1 represents the petal itself. 3 circles are being drawn on points 1.3, 1.5, and 3, representing different radii. The overlap of the circles at points 1.3 and 1.5 is made obvious by the opacity, indicating that the concentration of petals close to that length is higher. The opacity also helps to discover the second highest concentration point, the third, in other words, the more probable lengths. The data is then repeated a set number of times to surround the whole circle and give a flowery look.
the equation for x and y of the circles is based on the trigonometric formulas: x=rcos() y=rsin()

                                                         
(math.jpg)

Hovering over the circles in the flowers will show the exact petal length that prompted the visualization and the flower type. Hovering over the more opaque circles (more overlap of circles) will reveal the average petal length. 
Additionally, there are two buttons: "overlaid" and "individual," which toggle the view between the three flowers on top of each other or horizontally. The "overlaid" button provides a meaningful comparison when all the radial offsets are either set at zero or are the same amount. Especially for identifying the flower type with probabilities similar to a machine learning model.
## Challenge:
The challenge was making the flowers look accurate while maintaining the neutrality and clarity of the comparison. The adjustments of the variables, such as repeats, circle size, radius scale, and radial offset, were central, as was the color of the flowers.
### Steps taken to make the comparison clear and unbiased:
1. The point of the sliders: 
 I added sliders to experiment with different ways the data is being visualized. This approach leaves room for comparison and interesting visuals. In this project I have 2 comparisons: I'm comparing the 3 types of flowers to each other and the flowers to other flowers of the same type. The first one is easily achieved with the scale slider and buttons. The second one I found harder to pull off, so I added 3 offset sliders where you can play around with different ways to represent the data. For example, increasing the scale and decreasing the offset makes the overlapping of data points (more common petal lengths) easier to see. 
Note: since the radial offset, either stretches the flower in or out, if all the offset sliders are not put to the same amount, the petal lengths don't accurately match with the other flowers anymore. 
2. The shape of the data points: 
I initially wanted to use the petal width data as well as the length data, then I realized this depiction will be fundamentally flawed since the smaller petals will be overlayed twice as much as the bigger ones. Instead, I am using a circle with a fixed size, but just drawing it from different petal lengths.

## Remarks:
I was told that the visualization had to be on theme with the data and I put effort into matching the two in this project hence why I'm repeating the datapoint multiple times to show the data as flowers. However, since then I've seen other students work, and I don't think it needed to be. 
Message: comparison
I think the message of any data visualization is comparison, and the key is to convey the data in a clever and artistic way.

gradient tutorial: 
(https://www.youtube.com/watch?v=-MUOweQ6wac)

Slider tutorial:
(https://www.youtube.com/watch?v=RJi7GxVQIt8)