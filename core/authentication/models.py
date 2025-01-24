from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    STAFF = 'staff'
    ADMIN = 'admin'
    TYPE_CHOICES = [
        (STAFF, 'Staff'),
        (ADMIN, 'Admin'),
    ]
    employee_type = models.CharField(max_length=10, choices=TYPE_CHOICES)
    phone_no = models.CharField(max_length=15, blank=True, null=True)  # Add phone_number field
    hire_date = models.DateField(blank=True, null=True)
    is_staff = models.BooleanField(
        default=False,
        help_text='Designates whether the user can log into the admin site.'
    )

    def __str__(self):
        return self.username

    @property
    def is_employee_staff(self):
        return self.employee_type == self.STAFF

    @property
    def is_employee_admin(self):
        return self.employee_type == self.ADMIN