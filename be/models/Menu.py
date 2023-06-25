from be.models.db import db


class Menu(db.Model):
    __tablename__ = 'menus'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.Text, nullable=False)
    description = db.Column(db.Text)
    icon = db.Column(db.String(255))
    hide_price = db.Column(db.Boolean, default=False)
    # JSONB
    visibility = db.Column(db.JSON, default={})

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'icon': self.icon,
            'hide_price': self.hide_price,
            'visibility': self.visibility,
        }