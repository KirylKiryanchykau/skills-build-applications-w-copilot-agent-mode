from django.core.management.base import BaseCommand
from octofit_tracker.models import User, Team, Activity, Leaderboard, Workout
from datetime import date


class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **kwargs):
        # Clear existing data
        User.objects.all().delete()
        Team.objects.all().delete()
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()

        self.stdout.write('Cleared existing data.')

        # Create users (superheroes)
        users_data = [
            {'username': 'ironman', 'email': 'ironman@avengers.com', 'password': 'password123'},
            {'username': 'spiderman', 'email': 'spiderman@avengers.com', 'password': 'password123'},
            {'username': 'blackwidow', 'email': 'blackwidow@avengers.com', 'password': 'password123'},
            {'username': 'thor', 'email': 'thor@avengers.com', 'password': 'password123'},
            {'username': 'captainamerica', 'email': 'captainamerica@avengers.com', 'password': 'password123'},
            {'username': 'batman', 'email': 'batman@dcheroes.com', 'password': 'password123'},
            {'username': 'superman', 'email': 'superman@dcheroes.com', 'password': 'password123'},
            {'username': 'wonderwoman', 'email': 'wonderwoman@dcheroes.com', 'password': 'password123'},
            {'username': 'theflash', 'email': 'theflash@dcheroes.com', 'password': 'password123'},
            {'username': 'aquaman', 'email': 'aquaman@dcheroes.com', 'password': 'password123'},
        ]

        users = []
        for data in users_data:
            user = User(**data)
            user.save()
            users.append(user)

        self.stdout.write(f'Created {len(users)} users.')

        # Create teams
        marvel_members = [u.username for u in users if u.username in ['ironman', 'spiderman', 'blackwidow', 'thor', 'captainamerica']]
        dc_members = [u.username for u in users if u.username in ['batman', 'superman', 'wonderwoman', 'theflash', 'aquaman']]

        team_marvel = Team(name='Team Marvel', members=marvel_members)
        team_marvel.save()

        team_dc = Team(name='Team DC', members=dc_members)
        team_dc.save()

        self.stdout.write('Created 2 teams (Team Marvel, Team DC).')

        # Create activities
        activities_data = [
            {'user': 'ironman', 'activity_type': 'Flight Training', 'duration': 60.0, 'date': date(2026, 3, 1)},
            {'user': 'spiderman', 'activity_type': 'Web Swinging', 'duration': 45.0, 'date': date(2026, 3, 2)},
            {'user': 'blackwidow', 'activity_type': 'Martial Arts', 'duration': 90.0, 'date': date(2026, 3, 3)},
            {'user': 'thor', 'activity_type': 'Hammer Throwing', 'duration': 30.0, 'date': date(2026, 3, 4)},
            {'user': 'captainamerica', 'activity_type': 'Shield Training', 'duration': 75.0, 'date': date(2026, 3, 5)},
            {'user': 'batman', 'activity_type': 'Batarang Throwing', 'duration': 60.0, 'date': date(2026, 3, 1)},
            {'user': 'superman', 'activity_type': 'Flying', 'duration': 120.0, 'date': date(2026, 3, 2)},
            {'user': 'wonderwoman', 'activity_type': 'Lasso Training', 'duration': 50.0, 'date': date(2026, 3, 3)},
            {'user': 'theflash', 'activity_type': 'Speed Running', 'duration': 15.0, 'date': date(2026, 3, 4)},
            {'user': 'aquaman', 'activity_type': 'Swimming', 'duration': 80.0, 'date': date(2026, 3, 5)},
        ]

        for data in activities_data:
            activity = Activity(**data)
            activity.save()

        self.stdout.write(f'Created {len(activities_data)} activities.')

        # Create leaderboard entries
        leaderboard_data = [
            {'user': 'ironman', 'score': 950},
            {'user': 'spiderman', 'score': 870},
            {'user': 'blackwidow', 'score': 920},
            {'user': 'thor', 'score': 980},
            {'user': 'captainamerica', 'score': 960},
            {'user': 'batman', 'score': 940},
            {'user': 'superman', 'score': 1000},
            {'user': 'wonderwoman', 'score': 930},
            {'user': 'theflash', 'score': 990},
            {'user': 'aquaman', 'score': 880},
        ]

        for data in leaderboard_data:
            entry = Leaderboard(**data)
            entry.save()

        self.stdout.write(f'Created {len(leaderboard_data)} leaderboard entries.')

        # Create workouts
        workouts_data = [
            {
                'name': 'Iron Man Power Suit Workout',
                'description': 'High-intensity strength training inspired by Tony Stark',
                'exercises': ['Bench Press', 'Overhead Press', 'Deadlift', 'Pull-ups'],
            },
            {
                'name': 'Spider-Man Agility Training',
                'description': 'Parkour and agility drills for maximum flexibility',
                'exercises': ['Parkour Jumps', 'Wall Climb', 'Agility Ladder', 'Core Twists'],
            },
            {
                'name': 'Black Widow Combat Routine',
                'description': 'Martial arts and combat fitness training',
                'exercises': ['Shadow Boxing', 'Kickboxing', 'Grappling Drills', 'Flexibility Stretches'],
            },
            {
                'name': 'Thor Thunder Strength',
                'description': 'Heavy lifting and stamina workout',
                'exercises': ['Hammer Curls', 'Barbell Rows', 'Squats', 'Battle Ropes'],
            },
            {
                'name': 'Batman Dark Knight Conditioning',
                'description': 'Full-body conditioning for peak performance',
                'exercises': ['Pull-ups', 'Dips', 'Sprints', 'Obstacle Course'],
            },
        ]

        for data in workouts_data:
            workout = Workout(**data)
            workout.save()

        self.stdout.write(f'Created {len(workouts_data)} workouts.')

        self.stdout.write(self.style.SUCCESS('Successfully populated octofit_db with superhero test data!'))
