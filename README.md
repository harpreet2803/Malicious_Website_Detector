# Malicious_Website_Detector

Cybersecurity is a challenging task especially among the rising threats on the internet. Malicious websites are a common and serious threat to cybersecurity. They host unsolicited content and lure unsuspecting users to become victims of scams (monetary loss, theft of private information, and malware installation), and cause losses of billions of dollars every year. Most of the attacking techniques are realized through spreading compromised URLs (or the spreading of such URLs forms a critical part of the attacking operation). The Uniform Resource Locator (URL) is the well-defined structured format unique address for accessing websites over World Wide Web (WWW). We formulate malicious URL detection as a binary classification task for two-class prediction: malicious versus benign. Automated malicious URL detection is two-fold:

(1) Feature Representation: Extracting the appropriate feature representation from a d-dimensional feature vector representing the URL; and
(2) Machine Learning: Learning a prediction function which predicts the class assignment for any URL instance x using proper feature representations.

While the first part of feature representation is often based on domain knowledge and heuristics, the second part focuses on training the classification model via a data driven optimization approach. The goal of machine learning for malicious URL detection is to maximize the predictive accuracy, precision and minimize false positive rate.

## Approach

The first step involves collection of raw data and converting it into a .csv file with two features namely, URL and label. Post that multiple features are extracted out of the URL under three main categories, lexical features, host features and content based features. Once a basic dataset is ready we apply feature reduction techniques to reduce our columns and prepare it for modelling. The algorithms used only support numeric inputs hence we are using lexical, host and content numeric features from input URLs. So the input to machine learning algorithms will be the numeric features rather than actual raw URLs. Here, we will be using different types of models like linear models, tree-based models, unsupervised learning, statistical models and neural networks. This is done to identify the best algorithm which will then be used for the prediction function. The input to this prediction function is the website which the user is browsing. The output is either SAFE or UNSAFE based on our prediction algorithm. The application that we will be integrating our model with is a google chrome based plugin. This plugin will show a pop-up whenever the user visits a website showing whether the website is safe or malicious.

## Data

The data collection process mostly involved looking for malicious websites using web based sources.
1. https://dynamicbusiness.com/locked/norton-reveals-100-most-dangerous-websites4168.html - Norton's dangerous websites
2. https://research.aalto.fi/en/datasets/phishstorm-phishing-legitimate-url-dataset - PhishStrom Dataset
3. Malicious urls collected as part of the first project in class using a python web crawler.
