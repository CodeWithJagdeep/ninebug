"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Camera,
  Github,
  Linkedin,
  Code2,
  Target,
  Clock,
  Settings,
  User,
  Shield,
  Bell,
  Monitor,
  Mail,
  Building2,
  Coins,
  CheckCircle,
  MapPin,
  AlertCircle,
  Trash2,
  UserMinus,
  AlertTriangle,
  LogOut,
  Key,
  Download,
} from "lucide-react";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/Container/reducer/slicers/userSlicer";

interface UserProfile {
  _id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  linkedinprofile?: string;
  githubprofile?: string;
  profileURL?: string;
  currentBadge: number;
  targetCompany?: string;
  coins: number;
  isActive: boolean;
  trial: {
    interviewLeft: number;
    answersLeft: number;
    isTrialOver: boolean;
  };
  location: {
    city: string;
    region: string;
    country: string;
  };
  createdAt: string;
  updatedAt: string;
}

export default function ProfileSettings() {
  const { currentUser } = useSelector(selectCurrentUser);
  const [isLoading, setIsLoading] = useState(false);

  // Form state initialized with user data
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    linkedinprofile: "",
    githubprofile: "",
    targetCompany: "",
    location: {
      city: "",
      region: "",
      country: "",
    },
  });

  const [preferences, setPreferences] = useState({
    preferredLanguage: "javascript",
    codeTheme: "dark",
    fontSize: "14",
    autoSave: true,
    showHints: true,
    difficultyLevel: "intermediate",
    emailNotifications: true,
    pushNotifications: false,
    weeklyReport: true,
  });

  // Initialize form with user data when loaded
  useEffect(() => {
    if (currentUser) {
      setProfileData({
        name: currentUser.name,
        email: currentUser.email,
        linkedinprofile: currentUser.linkedinprofile || "",
        githubprofile: currentUser.githubprofile || "",
        targetCompany: currentUser.targetCompany || "",
        location: {
          city: currentUser.location.city,
          region: currentUser.location.region,
          country: currentUser.location.country,
        },
      });
    }
  }, [currentUser]);

  // Update profile mutation
  const updateProfile = useMutation({
    mutationFn: async (data: Partial<UserProfile>) => {
      const response = await axios.put("/api/user/profile", data);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Profile updated successfully!");
    },
    onError: () => {
      toast.error("Failed to update profile");
    },
  });

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await updateProfile.mutateAsync({
        name: profileData.name,
        linkedinprofile: profileData.linkedinprofile,
        githubprofile: profileData.githubprofile,
        targetCompany: profileData.targetCompany,
        location: {
          city: profileData.location.city,
          region: profileData.location.region,
          country: profileData.location.country,
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSavePreferences = async () => {
    setIsLoading(true);
    try {
      // Implement preferences saving logic
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Preferences updated successfully!");
    } catch (error) {
      toast.error("Failed to update preferences");
    } finally {
      setIsLoading(false);
    }
  };

  const handleProfilePictureChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsLoading(true);
      try {
        const formData = new FormData();
        formData.append("file", file);

        const response = await axios.post(
          "/api/user/upload-profile",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log(response);

        toast.success("Profile picture updated!");
      } catch (error) {
        toast.error("Failed to upload profile picture");
      } finally {
        setIsLoading(false);
      }
    }
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-gray-100">
      <div className="mx-auto px-4 py-8 bg-black">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-[#f48b1c] rounded-lg">
              <Settings className="h-6 w-6 text-black" />
            </div>
            <h1 className="text-3xl font-bold text-white bg-clip-text">
              Profile Settings
            </h1>
          </div>
          <p className="text-white/70">
            Manage your profile and interview preferences
          </p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-fit bg-white/10 border border-white/20">
            <TabsTrigger
              value="profile"
              className="flex items-center text-white gap-2 data-[state=active]:text-black px-4 data-[state=active]:bg-white rounded-md data-[state=active]:border data-[state=active]:border-gray-700"
            >
              <User className="h-4 w-4" />
              Profile
            </TabsTrigger>

            <TabsTrigger
              value="security"
              className="flex items-center text-white gap-2 data-[state=active]:text-black px-4 data-[state=active]:bg-white rounded-md data-[state=active]:border data-[state=active]:border-gray-700"
            >
              <Shield className="h-4 w-4" />
              Security
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Profile Picture & Basic Info */}
              <Card className="lg:col-span-1 bg-black border-gray-800 shadow-2xl">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-white font-medium">
                    <User className="h-5 w-5 text-gray-300" />
                    Profile Overview
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center space-y-6">
                  <div className="relative">
                    <Avatar className="h-36 w-36 border-2 border-gray-700 shadow-xl ring-4 ring-gray-800/50">
                      <AvatarImage
                        src={
                          currentUser?.profilePicture || "/placeholder-user.jpg"
                        }
                        alt="Profile picture"
                        className="object-cover"
                      />
                      <AvatarFallback className="text-2xl bg-gradient-to-br from-slate-600 to-slate-800 text-white font-semibold">
                        {currentUser.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <label
                      htmlFor="profile-picture"
                      className="absolute bottom-0 right-0 bg-white hover:bg-gray-50 text-gray-900 rounded-full p-2.5 cursor-pointer transition-all duration-200 shadow-lg hover:shadow-xl border border-gray-200"
                    >
                      <Camera className="h-4 w-4" />
                      <input
                        id="profile-picture"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleProfilePictureChange}
                      />
                    </label>
                  </div>

                  <div className="text-center space-y-4 w-full">
                    <div>
                      <h3 className="font-semibold text-xl text-white mb-2">
                        {currentUser.name}
                      </h3>
                      <Badge
                        variant="secondary"
                        className="bg-gray-800 text-gray-300 border border-gray-700 font-medium px-3 py-1"
                      >
                        {currentUser.currentBadge === 0
                          ? "Beginner Level"
                          : currentUser.currentBadge === 1
                          ? "Intermediate Level"
                          : "Advanced Level"}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-center gap-2 text-amber-400 bg-gray-900 rounded-lg px-4 py-2 border border-gray-800">
                      <Coins className="h-4 w-4" />
                      <span className="text-sm font-medium">
                        {currentUser.coins} coins
                      </span>
                    </div>

                    {currentUser?.trial && !currentUser?.trial.isTrialOver && (
                      <div className="bg-gray-900 rounded-lg p-3 text-sm text-gray-300 border border-gray-800">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-gray-400">Trial Status:</span>
                          <span className="font-medium">
                            {currentUser?.trial.interviewLeft} interviews
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400">Remaining:</span>
                          <span className="font-medium">
                            {currentUser?.trial.answersLeft} answers
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Personal Information */}
              <Card className="lg:col-span-2 bg-black border-gray-800 shadow-2xl">
                <CardHeader className="pb-6">
                  <CardTitle className="text-white font-medium text-lg">
                    Personal Information
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Manage your profile details and preferences
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSaveProfile} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label
                          htmlFor="name"
                          className="text-gray-300 font-medium"
                        >
                          Full Name
                        </Label>
                        <Input
                          id="name"
                          value={profileData.name}
                          onChange={(e) =>
                            setProfileData((prev) => ({
                              ...prev,
                              name: e.target.value,
                            }))
                          }
                          placeholder="Enter your full name"
                          className="bg-gray-900 border-gray-700 text-white placeholder-gray-500 focus:border-gray-500 focus:ring-1 focus:ring-gray-500 h-11"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="email"
                          className="text-gray-300 font-medium flex items-center gap-2"
                        >
                          <Mail className="h-4 w-4" />
                          Email Address
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          value={profileData.email}
                          disabled
                          className="bg-gray-900 border-gray-700 text-gray-500 cursor-not-allowed h-11"
                        />
                        {!currentUser.emailVerified && (
                          <p className="text-xs text-amber-500 flex items-center gap-1">
                            <AlertCircle className="h-3 w-3" />
                            Email verification pending
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label
                          htmlFor="linkedin"
                          className="text-gray-300 font-medium flex items-center gap-2"
                        >
                          <Linkedin className="h-4 w-4" />
                          LinkedIn Profile
                        </Label>
                        <Input
                          id="linkedin"
                          value={profileData.linkedinprofile}
                          onChange={(e) =>
                            setProfileData((prev) => ({
                              ...prev,
                              linkedinprofile: e.target.value,
                            }))
                          }
                          placeholder="https://linkedin.com/in/username"
                          className="bg-gray-900 border-gray-700 text-white placeholder-gray-500 focus:border-gray-500 focus:ring-1 focus:ring-gray-500 h-11"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="github"
                          className="text-gray-300 font-medium flex items-center gap-2"
                        >
                          <Github className="h-4 w-4" />
                          GitHub Profile
                        </Label>
                        <Input
                          id="github"
                          value={profileData.githubprofile}
                          onChange={(e) =>
                            setProfileData((prev) => ({
                              ...prev,
                              githubprofile: e.target.value,
                            }))
                          }
                          placeholder="https://github.com/username"
                          className="bg-gray-900 border-gray-700 text-white placeholder-gray-500 focus:border-gray-500 focus:ring-1 focus:ring-gray-500 h-11"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="company"
                        className="text-gray-300 font-medium flex items-center gap-2"
                      >
                        <Building2 className="h-4 w-4" />
                        Target Company
                      </Label>
                      <Input
                        id="company"
                        value={profileData.targetCompany}
                        onChange={(e) =>
                          setProfileData((prev) => ({
                            ...prev,
                            targetCompany: e.target.value,
                          }))
                        }
                        placeholder="Company you're targeting for your next role"
                        className="bg-gray-900 border-gray-700 text-white placeholder-gray-500 focus:border-gray-500 focus:ring-1 focus:ring-gray-500 h-11"
                      />
                    </div>

                    <div className="space-y-3">
                      <Label className="text-gray-300 font-medium flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        Location
                      </Label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Input
                          id="city"
                          value={profileData.location.city}
                          onChange={(e) =>
                            setProfileData((prev) => ({
                              ...prev,
                              location: {
                                ...prev.location,
                                city: e.target.value,
                              },
                            }))
                          }
                          placeholder="City"
                          className="bg-gray-900 border-gray-700 text-white placeholder-gray-500 focus:border-gray-500 focus:ring-1 focus:ring-gray-500 h-11"
                        />
                        <Input
                          id="region"
                          value={profileData.location.region}
                          onChange={(e) =>
                            setProfileData((prev) => ({
                              ...prev,
                              location: {
                                ...prev.location,
                                region: e.target.value,
                              },
                            }))
                          }
                          placeholder="State/Region"
                          className="bg-gray-900 border-gray-700 text-white placeholder-gray-500 focus:border-gray-500 focus:ring-1 focus:ring-gray-500 h-11"
                        />
                        <Input
                          id="country"
                          value={profileData.location.country}
                          onChange={(e) =>
                            setProfileData((prev) => ({
                              ...prev,
                              location: {
                                ...prev.location,
                                country: e.target.value,
                              },
                            }))
                          }
                          placeholder="Country"
                          className="bg-gray-900 border-gray-700 text-white placeholder-gray-500 focus:border-gray-500 focus:ring-1 focus:ring-gray-500 h-11"
                        />
                      </div>
                    </div>

                    <Button
                      type="submit"
                      disabled={isLoading || updateProfile.isPending}
                      className="w-full bg-white hover:bg-gray-50 text-black font-medium h-11 transition-colors duration-200"
                    >
                      {isLoading || updateProfile.isPending ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-black border-t-transparent mr-2" />
                          Saving Profile...
                        </>
                      ) : (
                        "Save Profile"
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Connected Accounts */}
            <Card className="bg-black border-gray-800 shadow-2xl">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center gap-3 text-white font-medium">
                  <Shield className="h-5 w-5 text-gray-300" />
                  Connected Accounts
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Manage your third-party integrations and OAuth connections
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-6 border rounded-xl border-gray-800 bg-gray-900/50 hover:bg-gray-900/70 transition-colors duration-200">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-gray-800 rounded-lg">
                      <Github className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-white">GitHub</p>
                      <p className="text-sm text-gray-400">
                        {currentUser.githubprofile
                          ? `Connected to ${currentUser.githubprofile}`
                          : "Connect your GitHub account for enhanced features"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {currentUser.githubprofile ? (
                      <>
                        <Badge
                          variant="secondary"
                          className="bg-emerald-900/30 text-emerald-300 border border-emerald-800/50 font-medium"
                        >
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Connected
                        </Badge>
                        <Button
                          variant="outline"
                          size="sm"
                          //   onClick={() => disconnectAccount("github")}
                          className="border-gray-700 hover:bg-gray-800 text-gray-200 hover:text-white transition-colors"
                          disabled={isLoading}
                        >
                          Disconnect
                        </Button>
                      </>
                    ) : (
                      <Button
                        size="sm"
                        className="bg-gray-800 hover:bg-gray-700 text-white border border-gray-700 transition-colors"
                        // onClick={() => signIn("github")}
                        disabled={isLoading}
                      >
                        Connect GitHub
                      </Button>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between p-6 border rounded-xl border-gray-800 bg-gray-900/50 hover:bg-gray-900/70 transition-colors duration-200">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-gray-800 rounded-lg">
                      <svg
                        className="h-6 w-6 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-white">Google</p>
                      <p className="text-sm text-gray-400">
                        Connect your Google account for seamless authentication
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge
                      variant="secondary"
                      className="bg-gray-800 text-gray-400 border border-gray-700 font-medium"
                    >
                      <Clock className="h-3 w-3 mr-1" />
                      Coming Soon
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-8">
            {/* Notifications */}
            <Card className="bg-black border-gray-800 shadow-2xl">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center gap-3 text-white font-medium">
                  <Bell className="h-5 w-5 text-gray-300" />
                  Notification Preferences
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Customize how you receive updates and reminders about your
                  account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 rounded-xl border border-gray-800 bg-gray-900/30 hover:bg-gray-900/50 transition-colors duration-200">
                  <div className="space-y-1">
                    <Label className="text-gray-300 font-medium">
                      Email Notifications
                    </Label>
                    <p className="text-sm text-gray-400">
                      Receive important updates and alerts via email
                    </p>
                  </div>
                  <Switch
                    checked={preferences.emailNotifications}
                    onCheckedChange={(checked) =>
                      setPreferences((prev) => ({
                        ...prev,
                        emailNotifications: checked,
                      }))
                    }
                    className="data-[state=checked]:bg-white data-[state=unchecked]:bg-gray-700 data-[state=checked]:border-white"
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl border border-gray-800 bg-gray-900/30 hover:bg-gray-900/50 transition-colors duration-200">
                  <div className="space-y-1">
                    <Label className="text-gray-300 font-medium">
                      Push Notifications
                    </Label>
                    <p className="text-sm text-gray-400">
                      Get instant notifications in your browser
                    </p>
                  </div>
                  <Switch
                    checked={preferences.pushNotifications}
                    onCheckedChange={(checked) =>
                      setPreferences((prev) => ({
                        ...prev,
                        pushNotifications: checked,
                      }))
                    }
                    className="data-[state=checked]:bg-white data-[state=unchecked]:bg-gray-700 data-[state=checked]:border-white"
                  />
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl border border-gray-800 bg-gray-900/30 hover:bg-gray-900/50 transition-colors duration-200">
                  <div className="space-y-1">
                    <Label className="text-gray-300 font-medium">
                      Weekly Progress Report
                    </Label>
                    <p className="text-sm text-gray-400">
                      Receive a comprehensive summary of your weekly progress
                    </p>
                  </div>
                  <Switch
                    checked={preferences.weeklyReport}
                    onCheckedChange={(checked) =>
                      setPreferences((prev) => ({
                        ...prev,
                        weeklyReport: checked,
                      }))
                    }
                    className="data-[state=checked]:bg-white data-[state=unchecked]:bg-gray-700 data-[state=checked]:border-white"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Save Preferences Button */}
            <div className="flex justify-end">
              <Button
                onClick={handleSavePreferences}
                disabled={isLoading}
                className="bg-white hover:bg-gray-50 text-black font-medium px-8 py-2.5 transition-colors duration-200"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-black border-t-transparent mr-2" />
                    Saving Preferences...
                  </>
                ) : (
                  <>
                    <Settings className="h-4 w-4 mr-2" />
                    Save Preferences
                  </>
                )}
              </Button>
            </div>

            {/* Account Security */}
            <Card className="bg-black border-gray-800 shadow-2xl">
              <CardHeader className="pb-6">
                <CardTitle className="flex items-center gap-3 text-white font-medium">
                  <Shield className="h-5 w-5 text-gray-300" />
                  Account Security
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Monitor and manage your account security settings and active
                  sessions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Security Status */}
                <div className="p-6 bg-emerald-950/30 border border-emerald-800/50 rounded-xl">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-emerald-900/40 rounded-lg">
                      <Shield className="h-5 w-5 text-emerald-400" />
                    </div>
                    <div>
                      <h3 className="font-medium text-emerald-300">
                        Account Protected
                      </h3>
                      <p className="text-sm text-emerald-400/80">
                        {currentUser.emailVerified
                          ? "Your email is verified and your account is fully secured."
                          : "Please verify your email address to enhance account security."}
                      </p>
                    </div>
                  </div>
                  {!currentUser.emailVerified && (
                    <Button
                      size="sm"
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium"
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Verify Email
                    </Button>
                  )}
                </div>

                {/* Active Sessions */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-white">Active Sessions</h4>
                    <Badge
                      variant="secondary"
                      className="bg-gray-800 text-gray-300 border border-gray-700"
                    >
                      <Clock className="h-3 w-3 mr-1" />1 Active
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-5 border rounded-xl border-gray-800 bg-gray-900/30">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-gray-800 rounded-lg">
                          <Monitor className="h-5 w-5 text-gray-400" />
                        </div>
                        <div>
                          <p className="font-medium text-white">
                            Current Session
                          </p>
                          <p className="text-sm text-gray-400 max-w-md truncate">
                            {navigator.userAgent.split(" ")[0]} •{" "}
                            {currentUser.location.city},{" "}
                            {currentUser.location.country}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            Last active: Just now
                          </p>
                        </div>
                      </div>
                      <Badge
                        variant="secondary"
                        className="bg-emerald-900/30 text-emerald-300 border border-emerald-800/50 font-medium"
                      >
                        <div className="w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse" />
                        Active
                      </Badge>
                    </div>
                  </div>
                </div>

                <Separator className="bg-gray-800" />

                {/* Security Actions */}
                <div className="space-y-4">
                  <h4 className="font-medium text-white">Security Actions</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <Button
                      variant="outline"
                      className="justify-start bg-gray-900/50 border-gray-700 hover:bg-gray-800 text-gray-200 hover:text-white transition-colors h-12"
                    >
                      <Clock className="h-4 w-4 mr-3" />
                      View Login History
                    </Button>

                    <Button
                      variant="outline"
                      className="justify-start bg-gray-900/50 border-gray-700 hover:bg-gray-800 text-gray-200 hover:text-white transition-colors h-12"
                    >
                      <Download className="h-4 w-4 mr-3" />
                      Download Data
                    </Button>

                    <Button
                      variant="outline"
                      className="justify-start bg-gray-900/50 border-gray-700 hover:bg-gray-800 text-gray-200 hover:text-white transition-colors h-12"
                    >
                      <Key className="h-4 w-4 mr-3" />
                      Change Password
                    </Button>

                    <Button
                      variant="outline"
                      className="justify-start text-red-400 hover:text-red-300 bg-gray-900/50 border-gray-700 hover:bg-red-950/20 transition-colors h-12"
                    >
                      <LogOut className="h-4 w-4 mr-3" />
                      Sign Out All Devices
                    </Button>
                  </div>
                </div>

                {/* Danger Zone */}
                <div className="mt-8 p-6 bg-red-950/20 border border-red-800/50 rounded-xl">
                  <h4 className="font-medium text-red-400 mb-3 flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    Danger Zone
                  </h4>
                  <p className="text-sm text-red-400/80 mb-4">
                    These actions are irreversible. Please proceed with caution.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      variant="outline"
                      className="justify-start text-red-400 hover:text-red-300 bg-transparent border-red-800/50 hover:bg-red-950/30 transition-colors"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete Account
                    </Button>
                    <Button
                      variant="outline"
                      className="justify-start text-red-400 hover:text-red-300 bg-transparent border-red-800/50 hover:bg-red-950/30 transition-colors"
                    >
                      <UserMinus className="h-4 w-4 mr-2" />
                      Deactivate Account
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
