import FamilyHead from '../models/FamilyHead.js';
import FamilyMember from '../models/FamilyMember.js';
import Counter from '../models/Counter.js';
import { generateFamilyPdf } from '../utils/generatePdf.js';

// Utility to check duplicate Aadhaar
const checkDuplicateAadhaar = async (aadhaar) => {
  const headExists = await FamilyHead.findOne({ aadhaar });
  if (headExists) return true;

  const memberExists = await FamilyMember.findOne({ aadhaar });
  return !!memberExists;
};

// ✅ Create a new family
export const createFamily = async (req, res) => {
  try {
    const { head, members } = req.body;

    if (await checkDuplicateAadhaar(head.aadhaar)) {
      return res.status(400).json({ error: 'Head Aadhaar already exists' });
    }

    for (const member of members) {
      if (await checkDuplicateAadhaar(member.aadhaar)) {
        return res.status(400).json({ error: `Member Aadhaar ${member.aadhaar} already exists` });
      }
    }

    const appNumber = await Counter.increment('familyRegistration');
    const applicationNumber = `APP-${String(appNumber).padStart(5, '0')}`;

    const newHead = new FamilyHead({ ...head, applicationNumber });
    const savedHead = await newHead.save();

    const membersToSave = members.map(member => ({
      ...member,
      headId: savedHead._id
    }));
    const savedMembers = await FamilyMember.insertMany(membersToSave);

    const pdfBuffer = await generateFamilyPdf(savedHead, savedMembers);

    res.status(201).json({
      success: true,
      applicationNumber,
      head: savedHead,
      members: savedMembers,
      pdf: pdfBuffer.toString('base64')
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ error: errors.join(', ') });
    }
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Duplicate Aadhaar detected' });
    }
    res.status(500).json({ error: error.message });
  }
};

//Downlod PDF
export const downloadFamilyPdf = async (req, res) => {
  try {
    const { appNumber } = req.params;

    const head = await FamilyHead.findOne({ applicationNumber: appNumber });
    if (!head) return res.status(404).json({ error: 'Application not found' });

    const members = await FamilyMember.find({ headId: head._id });

    const pdfBuffer = await generateFamilyPdf(head, members);

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${appNumber}.pdf"`,
      'Content-Length': pdfBuffer.length
    });

    res.send(pdfBuffer);
  } catch (error) {
    console.error('PDF Download Error:', error);
    res.status(500).json({ error: 'Failed to generate PDF' });
  }
};
// ✅ Get all families (heads only)
export const getFamilies = async (req, res) => {
  try {
    const families = await FamilyHead.find()
      .sort({ createdAt: -1 })
      .limit(5);
    
    // Add memberCount to each family
    const familiesWithMemberCount = families.map(family => {
      const familyObj = family.toObject();
      return {
        ...familyObj,
        memberCount: familyObj.members ? familyObj.members.length : 0
      };
    });
    
    res.json(familiesWithMemberCount);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// ✅ Get family by ID (including members)
export const getFamilyById = async (req, res) => {
  try {
    const head = await FamilyHead.findById(req.params.id);
    if (!head) return res.status(404).json({ error: 'Family not found' });

    const members = await FamilyMember.find({ headId: head._id });
    res.json({ head, members });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Delete family (head + all members)
export const deleteFamily = async (req, res) => {
  try {
    const head = await FamilyHead.findById(req.params.id);
    if (!head) return res.status(404).json({ error: 'Family not found' });

    await FamilyMember.deleteMany({ headId: head._id });
    await head.deleteOne();

    res.json({ success: true, message: 'Family deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
