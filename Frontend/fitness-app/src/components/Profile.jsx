import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthProvider';
import axios from 'axios';
import '../App.css';

function Profile() {
  const { userData, checkUser } = useAuth();
  const [formData, setFormData] = useState({
    name: userData.name || '',
    phoneNumber: userData.phoneNumber || '',
    email: userData.email || '',
  });
  const [newProfileImage, setNewProfileImage] = useState(null);
  const [isEditable, setIsEditable] = useState({ currentEditable: '' });
  const [isChanged, setIsChanged] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);

  const saveChanges = async () => {
    try {
      const data = new FormData();
      Object.keys(formData).forEach((field) =>
        data.append(field, formData[field])
      );
      if (newProfileImage) data.append('profileImage', newProfileImage);

      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/user/profile`,
        data,
        { withCredentials: true }
      );

      if (response.status === 200) {
        await checkUser(); // Refresh user data
        setIsChanged(false);
        setSaveMessage('All changes have been saved');
        setTimeout(() => setSaveMessage(''), 3000); // Clear message after 3 seconds
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleDeleteAccount = async () => {
    if (
      !window.confirm(
        'Are you sure you want to delete your account? This action cannot be undone.'
      )
    )
      return;

    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/user/profile`, {
        withCredentials: true,
      });
      window.location.href = '/';
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };

  const handleFileChange = (e) => {
    if (e.key === 'Enter' || e.type === 'change') {
      setNewProfileImage(e.target.files[0]);
      setIsChanged(true);
      document.getElementById('my_modal_2').close();
    }
  };

  const handleDoubleClick = (fieldId) =>
    setIsEditable({ currentEditable: fieldId });
  const handleKeyDown = (e, field) => {
    if (e.key === 'Enter') {
      setIsEditable({ currentEditable: '' });
    }
  };

  const handleInputChange = (e, field) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    setIsChanged(true);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        firstNameRef.current &&
        !firstNameRef.current.contains(event.target) &&
        lastNameRef.current &&
        !lastNameRef.current.contains(event.target)
      ) {
        setIsEditable({ currentEditable: '' });
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className='flex p-6 justify-center'>
      <div className='flex flex-col items-center gap-6 bg-base-300 p-6 pt-0 rounded-lg shadow-lg'>
        <div
          className='avatar online cursor-pointer'
          onClick={() => document.getElementById('my_modal_2').showModal()}
        >
          <div className='w-24 h-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2'>
            <img
              src={
                newProfileImage
                  ? URL.createObjectURL(newProfileImage)
                  : userData.profileImage || 'favicon.svg'
              }
              alt='Profile'
            />
          </div>
        </div>

        {/* Modal for image upload */}
        <dialog id='my_modal_2' className='modal'>
          <div className='modal-box'>
            <h3 className='font-bold text-lg'>Profile Image</h3>
            <div className='w-24 h-24 mx-auto mb-4'>
              <img
                src={
                  newProfileImage
                    ? URL.createObjectURL(newProfileImage)
                    : userData.profileImage || 'favicon.svg'
                }
                alt='Current Profile'
              />
            </div>
            <input
              type='file'
              name='profileImage'
              onChange={handleFileChange}
              onKeyDown={handleFileChange}
              className='block w-full'
              accept='image/*'
            />
          </div>
          <form method='dialog' className='modal-backdrop'>
            <button>Close</button>
          </form>
        </dialog>

        {/* Editable fields */}
        <div className='flex flex-col items-center gap-4 w-full max-w-xs'>
          <div className='flex w-full max-w-xs gap-4 mb-3'>
            <label
              ref={firstNameRef}
              className='form-control w-full max-w-xs group'
            >
              <div className='label'>
                <span className='label-text'>Name</span>
              </div>
              <div className='relative group w-full'>
                {!isEditable.currentEditable && (
                  <span className='absolute top-0 right-0 text-xs badge indicator-item group-hover:opacity-100 opacity-0 transition-opacity'>
                    Double-click to edit
                  </span>
                )}
              </div>
              <input
                type='text'
                placeholder={formData.name}
                className={`input w-full max-w-xs text-2xl font-bold tracking-tight ${
                  isEditable.currentEditable === 'name'
                    ? 'input-bordered'
                    : 'input-ghost'
                }`}
                readOnly={isEditable.currentEditable !== 'name'}
                onDoubleClick={() => handleDoubleClick('name')}
                onKeyDown={(e) => handleKeyDown(e, 'name')}
                value={formData.name}
                onChange={(e) => handleInputChange(e, 'name')}
              />
            </label>
          </div>

          {/* Email */}

          <label ref={emailRef} className='form-control w-full max-w-xs group'>
            <div className='label'>
              <span className='label-text'>Email</span>
            </div>
            <input
              type='text'
              placeholder={formData.email}
              className={`input w-full max-w-xs text-2xl font-bold tracking-tight ${
                isEditable.currentEditable === 'email'
                  ? 'input-bordered'
                  : 'input-ghost'
              }`}
              readOnly={isEditable.currentEditable !== 'email'}
              onDoubleClick={() => handleDoubleClick('email')}
              onKeyDown={(e) => handleKeyDown(e, 'email')}
              value={formData.email}
              onChange={(e) => handleInputChange(e, 'email')}
            />
          </label>

          {/* Phone Number */}
          <label ref={phoneRef} className='form-control w-full max-w-xs group'>
            <div className='label'>
              <span className='label-text'>Tel.</span>
            </div>
            <input
              type='text'
              placeholder={formData.phoneNumber}
              className={`input w-full max-w-xs text-2xl font-bold tracking-tight ${
                isEditable.currentEditable === 'phoneNumber'
                  ? 'input-bordered'
                  : 'input-ghost'
              }`}
              readOnly={isEditable.currentEditable !== 'phoneNumber'}
              onDoubleClick={() => handleDoubleClick('phoneNumber')}
              onKeyDown={(e) => handleKeyDown(e, 'phoneNumber')}
              value={formData.phoneNumber}
              onChange={(e) => handleInputChange(e, 'phoneNumber')}
            />
          </label>

          {/* Conditionally rendered Save Changes Button */}
          {isChanged && (
            <button
              onClick={saveChanges}
              className='text-white bg-green-600 hover:bg-green-700 w-full rounded-lg mt-4 p-2 font-semibold'
            >
              Save Changes
            </button>
          )}

          {/* Success message */}
          {saveMessage && (
            <div className='text-green-600 mt-2 font-semibold'>
              {saveMessage}
            </div>
          )}

          {/* Delete Account Button */}
          <button
            onClick={handleDeleteAccount}
            className='text-white bg-red-800 hover:bg-red-500 w-full rounded-lg p-2 font-semibold'
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
