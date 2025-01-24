# Generated by Django 5.0.2 on 2025-01-23 07:01

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("hotelmanage", "0001_initial"),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name="roomcleanlog",
            name="cleaning_duration",
            field=models.DurationField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name="roomcleanlog",
            name="items_restored",
            field=models.JSONField(default=dict),
        ),
        migrations.AddField(
            model_name="roomcleanlog",
            name="quality_score",
            field=models.FloatField(default=0.0),
        ),
        migrations.AddField(
            model_name="roomcleanlog",
            name="verified_by",
            field=models.ForeignKey(
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                related_name="verifications",
                to=settings.AUTH_USER_MODEL,
            ),
        ),
        migrations.CreateModel(
            name="EmployeePerformance",
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
                ("total_rooms_cleaned", models.IntegerField(default=0)),
                ("successful_cleanings", models.IntegerField(default=0)),
                ("average_duration", models.DurationField(null=True)),
                ("average_quality_score", models.FloatField(default=0.0)),
                ("monthly_rating", models.FloatField(default=0.0)),
                (
                    "employee",
                    models.OneToOneField(
                        on_delete=django.db.models.deletion.CASCADE,
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
    ]
