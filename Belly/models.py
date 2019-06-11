from .app import db


class Belly(db.Model):
    __tablename__ = 'samples'

    id = db.Column(db.Integer, primary_key=True)
    sample = db.Column(db.Integer)
    ethnicity = db.Column(db.String(64))
    gender = db.Column(db.String(64))
    age = db.Column(db.Integer))
    location = db.Column(db.String(64))
    bbtype = db.Column(db.String(64))
    wfreq = db.Column(db.Integer)

    def __repr__(self):
        return '<Sample %r>' % (self.id)
