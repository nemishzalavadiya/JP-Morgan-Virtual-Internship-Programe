import unittest
from client3 import getDataPoint,getRatio

class ClientTest(unittest.TestCase):

  def test_getDataPoint_calculatePrice(self):
    quotes = [
      {'top_ask': {'price': 121.2, 'size': 36}, 'timestamp': '2019-02-11 22:06:30.572453', 'top_bid': {'price': 120.48, 'size': 109}, 'id': '0.109974697771', 'stock': 'ABC'},
      {'top_ask': {'price': 121.68, 'size': 4}, 'timestamp': '2019-02-11 22:06:30.572453', 'top_bid': {'price': 117.87, 'size': 81}, 'id': '0.109974697771', 'stock': 'DEF'}
    ]
    """ ------------ Add the assertion below ------------ """
    for quote in quotes:
      self.assertEqual(getDataPoint(quote),(quote['stock'],quote['top_bid']['price'],quote['top_ask']['price'],round((quote['top_bid']['price']+quote['top_ask']['price'])/2,8)))

  def test_getDataPoint_calculatePriceBidGreaterThanAsk(self):
    quotes = [
      {'top_ask': {'price': 119.2, 'size': 36}, 'timestamp': '2019-02-11 22:06:30.572453', 'top_bid': {'price': 120.48, 'size': 109}, 'id': '0.109974697771', 'stock': 'ABC'},
      {'top_ask': {'price': 121.68, 'size': 4}, 'timestamp': '2019-02-11 22:06:30.572453', 'top_bid': {'price': 117.87, 'size': 81}, 'id': '0.109974697771', 'stock': 'DEF'}
    ]
    """ ------------ Add the assertion below ------------ """
    for quote in quotes:
      self.assertEqual(getDataPoint(quote),(quote['stock'],quote['top_bid']['price'],quote['top_ask']['price'],round((quote['top_bid']['price']+quote['top_ask']['price'])/2,8)))


  """ ------------ Add more unit tests ------------ """
  def test_getRatio(self):
    self.assertEqual(getRatio(1,0),None)
    self.assertEqual(getRatio(100,525),round(100/525,8))
    self.assertEqual(getRatio(0,0),None)
    self.assertEqual(getRatio(1,100),round(1/100,8))
    self.assertEqual(getRatio(156,10),round(156/10,8))

if __name__ == '__main__':
    unittest.main()
