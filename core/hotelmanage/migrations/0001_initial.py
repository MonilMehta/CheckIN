# Generated by Django 5.0.1 on 2024-03-14 15:47

import django.core.validators
import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name="RoomStatus",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("room_number", models.CharField(max_length=50)),
                (
                    "status",
                    models.CharField(
                        choices=[
                            ("clean", "Clean"),
                            ("maintenance", "Needs Maintenance"),
                        ],
                        default="clean",
                        max_length=20,
                    ),
                ),
                ("last_checked", models.DateTimeField(auto_now=True)),
                ("progress_description", models.TextField(blank=True, null=True)),
                (
                    "room_image",
                    models.ImageField(blank=True, null=True, upload_to="room_images/"),
                ),
                (
                    "bottle",
                    models.PositiveIntegerField(
                        default=0,
                        validators=[django.core.validators.MaxValueValidator(2)],
                    ),
                ),
                (
                    "cup",
                    models.PositiveIntegerField(
                        default=0,
                        validators=[django.core.validators.MaxValueValidator(4)],
                    ),
                ),
                (
                    "wine_glass",
                    models.PositiveIntegerField(
                        default=0,
                        validators=[django.core.validators.MaxValueValidator(2)],
                    ),
                ),
                (
                    "bowl",
                    models.PositiveIntegerField(
                        default=0,
                        validators=[django.core.validators.MaxValueValidator(4)],
                    ),
                ),
                (
                    "employee",
                    models.ForeignKey(
                        default=1,
                        on_delete=django.db.models.deletion.CASCADE,
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
    ]
