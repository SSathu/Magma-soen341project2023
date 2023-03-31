
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();



export default async function handler(req, res) {

  const { loggedInJobPostingId, firstname, lastname, email, country, postalCode, bio, city , phone, password } = req.body;

  try {
    const data = {};
    if (firstname !== '') {
      data.FirstName = firstname;
    }
    if (lastname !== '') {
      data.LastName = lastname;
    }
    if (email !== '') {
      data.Email = email;
    }

    if (country !== '') {
      data.Country = country;
    }
    if (postalCode !== '') {
      data.PostalCode = postalCode;
    }
    if (bio !== '') {
      data.Bio = bio;
    }
    if (city !== '') {
      data.City = city;
    }
    if (phone !== '') {
      data.PhoneNumber = phone;
    }
    if (password !== '') {
      data.Password = password;
    }
  
    if (Object.keys(data).length > 0) {
      const updatedUser = await prisma.user.update({
        where: { id: loggedInJobPostingId },
        data,
      });
      res.status(200).json(updatedUser);
    } else {
      res.status(400).json({ message: 'No fields to update' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating user' });
  }

}