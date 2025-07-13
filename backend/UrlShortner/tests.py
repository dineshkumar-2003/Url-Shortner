from rest_framework.test import APITestCase
from django.urls import reverse

class ShortenTest(APITestCase):
    def test_create_short_url(self):
        response = self.client.post(reverse('shorten'), {"url": "https://www.google.com"}, format='json')
        self.assertEqual(response.status_code, 200)
        self.assertIn("short_url", response.data)
