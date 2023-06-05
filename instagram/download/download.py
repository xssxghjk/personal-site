# forced to use python because instaloader
import instaloader

# Get instance
L = instaloader.Instaloader()
L.compress_json = False
L.login("yourDummyInstagramAccount", "yourDummyInstagramPassword")
profile = instaloader.Profile.from_username(L.context, "igAccountWithMedia")
highlights = L.get_highlights(profile)

for highlight in L.get_highlights(profile):
    for item in highlight.get_items():
        # item is a StoryItem object
        L.download_storyitem(item, '{}'.format(highlight.title.replace(" ", "_")))
