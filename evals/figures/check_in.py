"""Fictional code used as the source for check-in.dot."""


def check_in(id, already_used, save):
    """save returns "confirmed" or None when the reply is missing."""
    if already_used(id):
        return "supervisor"
    if save(id) == "confirmed":
        return "admit"
    return "keep ID; check status"
