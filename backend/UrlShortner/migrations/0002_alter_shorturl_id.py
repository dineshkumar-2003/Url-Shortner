# Generated by Django 5.0.3 on 2025-07-13 05:36

import uuid
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('UrlShortner', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='shorturl',
            name='id',
            field=models.UUIDField(auto_created=True, default=uuid.uuid4, editable=False, primary_key=True, serialize=False),
        ),
    ]
