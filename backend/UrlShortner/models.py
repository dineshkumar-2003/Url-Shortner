from django.db import models
import uuid

class ShortURL(models.Model):
    id = models.UUIDField(primary_key=True, editable=False, auto_created=True, default=uuid.uuid4)
    original_url = models.URLField()
    short_code = models.CharField(max_length=8, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    click_count = models.PositiveIntegerField(default=0)  

    def __str__(self):
        return f"{self.short_code} -> {self.original_url}"
    


